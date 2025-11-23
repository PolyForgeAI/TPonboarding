import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Input } from "@/shared/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { Search, UserX, UserCheck, Shield } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/shared/components/ui/dialog";

export default function UserManagement() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [toggleUserId, setToggleUserId] = useState(null);

  const { data: users, isLoading } = useQuery({
    queryKey: ['all-users'],
    queryFn: () => base44.entities.User.list('-created_date', 100),
    initialData: [],
  });

  const toggleStatusMutation = useMutation({
    mutationFn: ({ id, is_active }) => base44.entities.User.update(id, { is_active }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['all-users'] });
      toast.success(variables.is_active ? "User activated" : "User disabled");
      setToggleUserId(null);
    },
  });

  const handleToggleStatus = (user) => {
    toggleStatusMutation.mutate({
      id: user.id,
      is_active: !user.is_active
    });
  };

  const filteredUsers = users.filter(user =>
    user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeUsers = filteredUsers.filter(u => u.is_active !== false);
  const disabledUsers = filteredUsers.filter(u => u.is_active === false);

  const selectedUser = users.find(u => u.id === toggleUserId);

  return (
    <div className="min-h-screen gradient-mesh p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">User Management</h1>
          <p className="text-slate-600">Manage user access and permissions</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <StatCard label="Total Users" value={users.length} color="blue" />
          <StatCard label="Active Users" value={activeUsers.length} color="green" />
          <StatCard label="Disabled Users" value={disabledUsers.length} color="red" />
        </div>

        {/* Users List */}
        <Card className="shadow-elevated">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>All Users</CardTitle>
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{user.full_name || "—"}</div>
                        <div className="text-sm text-slate-500">{user.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                        {user.role === "admin" && <Shield className="w-3 h-3 mr-1" />}
                        {user.role || "user"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {user.is_active === false ? (
                        <Badge variant="destructive" className="bg-red-600">
                          <UserX className="w-3 h-3 mr-1" />
                          Disabled
                        </Badge>
                      ) : (
                        <Badge className="bg-green-600">
                          <UserCheck className="w-3 h-3 mr-1" />
                          Active
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-slate-600">
                        {new Date(user.created_date).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant={user.is_active === false ? "default" : "destructive"}
                        onClick={() => setToggleUserId(user.id)}
                        className={user.is_active === false ? "bg-green-600 hover:bg-green-700" : ""}
                      >
                        {user.is_active === false ? (
                          <>
                            <UserCheck className="w-4 h-4 mr-1" />
                            Activate
                          </>
                        ) : (
                          <>
                            <UserX className="w-4 h-4 mr-1" />
                            Disable
                          </>
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Confirmation Dialog */}
        <Dialog open={!!toggleUserId} onOpenChange={() => setToggleUserId(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {selectedUser?.is_active === false ? "Activate User?" : "Disable User?"}
              </DialogTitle>
              <DialogDescription>
                {selectedUser?.is_active === false ? (
                  <>
                    This will restore access for <strong>{selectedUser?.full_name}</strong> ({selectedUser?.email}).
                  </>
                ) : (
                  <>
                    This will prevent <strong>{selectedUser?.full_name}</strong> ({selectedUser?.email}) from accessing the system. Their data will be preserved.
                  </>
                )}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setToggleUserId(null)}>Cancel</Button>
              <Button
                variant={selectedUser?.is_active === false ? "default" : "destructive"}
                onClick={() => selectedUser && handleToggleStatus(selectedUser)}
                className={selectedUser?.is_active === false ? "bg-green-600 hover:bg-green-700" : ""}
              >
                {selectedUser?.is_active === false ? "Activate User" : "Disable User"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

function StatCard({ label, value, color }) {
  const colors = {
    blue: "from-blue-500 to-cyan-500",
    green: "from-emerald-500 to-teal-500",
    red: "from-red-500 to-pink-500",
  };

  return (
    <Card className="shadow-elevated card-lift border-none">
      <CardContent className="pt-6">
        <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-r ${colors[color]} mb-4 shadow-lg`}>
          <div className="text-3xl font-bold text-white">{value}</div>
        </div>
        <p className="text-slate-600 font-medium">{label}</p>
      </CardContent>
    </Card>
  );
}