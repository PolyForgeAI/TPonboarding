import React from "react";
import AdminLayout from "../components/AdminLayout";
import ReferralCodeManager from "../components/ReferralCodeManager";

export default function ReferralCodesPage() {
    return (
        <AdminLayout>
            <div className="p-6">
                <ReferralCodeManager />
            </div>
        </AdminLayout>
    );
}
