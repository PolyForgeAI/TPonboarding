import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Textarea } from "@/shared/components/ui/textarea";
import { 
  FileText, Send, Clock, CheckCircle, ExternalLink, 
  Search, Filter, Plus, Calendar
} from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/shared/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

export default function ContentLibrary({ submission }) {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);
  const [scheduleData, setScheduleData] = useState({
    days: "3",
    subject: "",
    note: ""
  });

  // Fetch all content from database
  const { data: allContent = [] } = useQuery({
    queryKey: ['sales-content'],
    queryFn: () => base44.entities.SalesContent.filter({ active: true }, 'sort_order', 50),
    initialData: [],
  });

  // Fetch delivery history for this submission
  const { data: deliveryHistory = [] } = useQuery({
    queryKey: ['content-deliveries', submission.id],
    queryFn: () => base44.entities.ContentDelivery.filter({ submission_id: submission.id }),
    initialData: [],
  });

  const sendContentMutation = useMutation({
    mutationFn: async ({ contentId, immediate }) => {
      const content = allContent.find(c => c.id === contentId);
      
      // Create delivery record
      const delivery = await base44.entities.ContentDelivery.create({
        submission_id: submission.id,
        content_id: contentId,
        recipient_email: submission.contact_email,
        recipient_name: submission.contact_name,
        delivery_method: immediate ? "immediate" : "scheduled",
        scheduled_for: immediate ? null : new Date(Date.now() + parseInt(scheduleData.days) * 24 * 60 * 60 * 1000).toISOString(),
        email_subject: scheduleData.subject || `Resources from Timeless Pools - ${content.title}`,
        personal_note: scheduleData.note,
        status: immediate ? "pending" : "pending", // Would be "sent" after actual email integration
      });

      // In production, would trigger actual email via SendEmail integration
      if (immediate) {
        await base44.integrations.Core.SendEmail({
          to: submission.contact_email,
          subject: `Resources from Timeless Pools - ${content.title}`,
          body: `Hi ${submission.contact_name},\n\nI thought you might find this helpful: ${content.title}\n\n${content.description}\n\nView here: ${content.url}\n\nBest,\nTimeless Pools Team`
        });
      }

      return delivery;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['content-deliveries', submission.id] });
      queryClient.invalidateQueries({ queryKey: ['sales-content'] });
      
      if (variables.immediate) {
        toast.success(`✓ Sent to ${submission.contact_email}`);
      } else {
        toast.success(`✓ Scheduled to send in ${scheduleData.days} days`);
      }
      
      setScheduleDialogOpen(false);
      setSelectedContent(null);
      setScheduleData({ days: "3", subject: "", note: "" });
    },
  });

  const categories = ["all", "portfolio", "materials", "education", "process", "testimonials", "technical"];

  const filteredContent = allContent.filter(item => {
    const matchesSearch = item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSendNow = async (contentItem) => {
    sendContentMutation.mutate({ contentId: contentItem.id, immediate: true });
  };

  const handleScheduleSend = (contentItem) => {
    setSelectedContent(contentItem);
    setScheduleDialogOpen(true);
  };

  const confirmSchedule = () => {
    sendContentMutation.mutate({ contentId: selectedContent.id, immediate: false });
  };

  const alreadySentIds = deliveryHistory.map(d => d.content_id);

  return (
    <Card className="border-none shadow-elevated">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-purple-600" />
              Content Library
            </CardTitle>
            <p className="text-sm text-slate-600 mt-1">
              Send brochures, catalogs, and resources to {submission.contact_name}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search & Filter */}
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-40">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="portfolio">Portfolio</SelectItem>
              <SelectItem value="materials">Materials</SelectItem>
              <SelectItem value="education">Education</SelectItem>
              <SelectItem value="process">Process</SelectItem>
              <SelectItem value="testimonials">Testimonials</SelectItem>
              <SelectItem value="technical">Technical</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Delivery History Summary */}
        {deliveryHistory.length > 0 && (
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-900">
              <strong>{deliveryHistory.length} items</strong> already sent or scheduled for this customer
            </p>
          </div>
        )}

        {/* Content Grid */}
        <div className="grid gap-3">
          {filteredContent.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No content found. Add content items to your library.</p>
            </div>
          ) : (
            filteredContent.map((item) => {
              const alreadySent = alreadySentIds.includes(item.id);
              const delivery = deliveryHistory.find(d => d.content_id === item.id);
              
              return (
                <ContentItem
                  key={item.id}
                  item={item}
                  alreadySent={alreadySent}
                  delivery={delivery}
                  onSendNow={() => handleSendNow(item)}
                  onSchedule={() => handleScheduleSend(item)}
                  isSending={sendContentMutation.isPending}
                />
              );
            })
          )}
        </div>

        {/* Schedule Dialog */}
        <Dialog open={scheduleDialogOpen} onOpenChange={setScheduleDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Schedule Content Delivery</DialogTitle>
              <DialogDescription>
                Schedule "{selectedContent?.title}" for {submission.contact_name}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label>Send After</Label>
                <Select value={scheduleData.days} onValueChange={(val) => setScheduleData({...scheduleData, days: val})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 day from now</SelectItem>
                    <SelectItem value="3">3 days from now</SelectItem>
                    <SelectItem value="7">7 days from now</SelectItem>
                    <SelectItem value="14">14 days from now</SelectItem>
                    <SelectItem value="30">30 days from now</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Email Subject (optional)</Label>
                <Input 
                  placeholder={`Resources from Timeless Pools - ${selectedContent?.title}`}
                  value={scheduleData.subject}
                  onChange={(e) => setScheduleData({...scheduleData, subject: e.target.value})}
                />
              </div>

              <div>
                <Label>Personal Note (optional)</Label>
                <Textarea 
                  placeholder="Add a personal message that will appear in the email..."
                  value={scheduleData.note}
                  onChange={(e) => setScheduleData({...scheduleData, note: e.target.value})}
                  rows={3}
                />
              </div>

              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-900">
                  Will be sent to: <strong>{submission.contact_email}</strong>
                </p>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setScheduleDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={confirmSchedule} 
                className="bg-purple-600 hover:bg-purple-700"
                disabled={sendContentMutation.isPending}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Send
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}

function ContentItem({ item, alreadySent, delivery, onSendNow, onSchedule, isSending }) {
  return (
    <div className={cn(
      "p-4 glass rounded-lg border-2 transition-all",
      alreadySent ? "border-green-300 bg-green-50/50" : "border-slate-200 hover:border-purple-300"
    )}>
      <div className="flex items-start gap-4">
        {/* Thumbnail */}
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl flex-shrink-0">
          {item.thumbnail_icon || "📄"}
        </div>

        {/* Content Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <h4 className="font-semibold text-slate-900">{item.title}</h4>
              <p className="text-xs text-slate-600 mt-1">{item.description}</p>
            </div>
            <Badge variant="outline" className="text-xs flex-shrink-0">
              {item.type}
            </Badge>
          </div>

          {/* Tags */}
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {item.tags.map((tag, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Status & Actions */}
          {alreadySent && delivery ? (
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-green-700 font-medium">
                {delivery.status === "sent" ? "Sent" : delivery.status === "pending" && delivery.scheduled_for ? "Scheduled" : "Delivered"}
              </span>
              {delivery.sent_at && (
                <span className="text-slate-500">
                  • {new Date(delivery.sent_at).toLocaleDateString()}
                </span>
              )}
              {delivery.scheduled_for && !delivery.sent_at && (
                <span className="text-slate-500">
                  • Sending {new Date(delivery.scheduled_for).toLocaleDateString()}
                </span>
              )}
            </div>
          ) : (
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={onSendNow}
                disabled={isSending}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {isSending ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-1" />
                    Send Now
                  </>
                )}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={onSchedule}
                disabled={isSending}
              >
                <Clock className="w-4 h-4 mr-1" />
                Schedule
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => window.open(item.url, '_blank')}
              >
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}