import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Users, Download, Mail, Phone, Calendar, RefreshCw, Copy, Check } from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  mobile: string;
  email: string;
  submittedAt: string;
  recipientEmail?: string;
}

interface AdminLeadsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminLeadsModal: React.FC<AdminLeadsModalProps> = ({ isOpen, onClose }) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/leads');
      const data = await res.json();
      if (data.leads) {
        setLeads(data.leads);
      }
    } catch (err) {
      console.error('Failed to fetch leads:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchLeads();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const downloadCSV = () => {
    if (leads.length === 0) return;

    const headers = ['Name', 'Mobile Number', 'Email Address', 'Submitted At', 'Recipient Email'];
    const rows = leads.map((l) => [
      `"${l.name.replace(/"/g, '""')}"`,
      `"${l.mobile.replace(/"/g, '""')}"`,
      `"${l.email.replace(/"/g, '""')}"`,
      `"${new Date(l.submittedAt).toLocaleString()}"`,
      `"${l.recipientEmail || 'mchatterjee69@gmail.com'}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `welcome_kit_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyToClipboard = (lead: Lead) => {
    const text = `Lead: ${lead.name} | Mobile: ${lead.mobile} | Email: ${lead.email} | Date: ${new Date(lead.submittedAt).toLocaleString()}`;
    navigator.clipboard.writeText(text);
    setCopiedId(lead.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-2xl bg-[#07231F] border-2 border-[#D4AF37] rounded-3xl p-6 sm:p-8 shadow-[0_25px_70px_rgba(212,175,55,0.3)] text-white overflow-hidden max-h-[85vh] flex flex-col"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-[#0F4C45]/50 border border-[#1C6B63] text-slate-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-[#1C6B63] pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#FFF2BE] text-xs font-semibold mb-1">
                <Users className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Target: mchatterjee69@gmail.com</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold gold-text-gradient">
                Captured Welcome Kit Registrations ({leads.length})
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={fetchLeads}
                disabled={loading}
                className="p-2 rounded-xl bg-[#0F4C45] border border-[#1C6B63] text-slate-200 hover:text-white transition-colors"
                title="Refresh leads list"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </button>

              <button
                onClick={downloadCSV}
                disabled={leads.length === 0}
                className="px-3.5 py-2 rounded-xl bg-[#D4AF37] text-[#07231F] font-bold text-xs flex items-center gap-1.5 hover:bg-[#FFF2BE] transition-colors disabled:opacity-50 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          {/* Leads List */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar">
            {leads.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                <Users className="w-10 h-10 mx-auto mb-2 text-slate-500 opacity-50" />
                <p className="text-sm">No user registrations recorded yet.</p>
                <p className="text-xs text-slate-500 mt-1">
                  When visitors submit their Name, Mobile Number, and Email ID, they will appear here and be dispatched to <strong>mchatterjee69@gmail.com</strong>.
                </p>
              </div>
            ) : (
              leads.map((lead) => (
                <div
                  key={lead.id}
                  className="p-4 rounded-2xl bg-[#0F4C45]/50 border border-[#1C6B63] hover:border-[#D4AF37]/50 transition-all flex flex-wrap items-center justify-between gap-3"
                >
                  <div className="space-y-1 text-xs">
                    <p className="text-sm font-bold text-[#FFF2BE]">{lead.name}</p>
                    <div className="flex flex-wrap items-center gap-3 text-slate-300">
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3 text-[#D4AF37]" />
                        {lead.mobile}
                      </span>
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3 text-[#D4AF37]" />
                        {lead.email}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-emerald-400" />
                      {new Date(lead.submittedAt).toLocaleString()}
                    </p>
                  </div>

                  <button
                    onClick={() => copyToClipboard(lead)}
                    className="px-3 py-1.5 rounded-lg bg-[#07231F] border border-[#1C6B63] text-xs font-medium text-slate-300 hover:text-white flex items-center gap-1 transition-colors"
                  >
                    {copiedId === lead.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-[#1C6B63] text-center text-[11px] text-slate-400">
            Form submissions are stored on server and forwarded to <strong className="text-[#D4AF37]">mchatterjee69@gmail.com</strong>.
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
