"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Shield, Moon } from "lucide-react";
import { Button } from "@/app/components/Button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "preferences", label: "Preferences", icon: Moon },
    { id: "security", label: "Security", icon: Shield },
  ];

  return (
    <div className="flex-1 p-8 overflow-y-auto bg-background/50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your account settings and preferences.</p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Settings Sidebar */}
          <div className="w-full md:w-64 shrink-0">
            <div className="flex flex-col gap-1 p-1 bg-card border border-border/50 rounded-2xl shadow-sm">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? "text-primary" : "text-muted-foreground"}`} />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Settings Content */}
          <div className="flex-1 min-w-0">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-card border border-border/50 rounded-3xl p-6 md:p-8 shadow-sm"
            >
              {activeTab === "profile" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-foreground">Profile Information</h2>
                    <p className="text-sm text-muted-foreground mt-1">Update your personal details here.</p>
                  </div>
                  <hr className="border-border/50" />
                  
                  <div className="space-y-4 max-w-md">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Full Name</label>
                      <Input defaultValue="John Doe" className="bg-background h-11 rounded-xl" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Email Address</label>
                      <Input defaultValue="john@example.com" type="email" disabled className="bg-secondary/50 h-11 rounded-xl opacity-70" />
                      <p className="text-xs text-muted-foreground mt-1.5">Email address cannot be changed directly.</p>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button text="Save Changes" className="rounded-full px-6" />
                  </div>
                </div>
              )}

              {activeTab === "preferences" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-foreground">App Preferences</h2>
                    <p className="text-sm text-muted-foreground mt-1">Customize your experience.</p>
                  </div>
                  <hr className="border-border/50" />
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-foreground">Dark Mode</h3>
                        <p className="text-sm text-muted-foreground">Toggle dark mode appearance.</p>
                      </div>
                      <Switch id="dark-mode" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-foreground">Email Notifications</h3>
                        <p className="text-sm text-muted-foreground">Receive updates and tips via email.</p>
                      </div>
                      <Switch id="email-notifs" defaultChecked />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "security" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-foreground">Security</h2>
                    <p className="text-sm text-muted-foreground mt-1">Manage your password and security settings.</p>
                  </div>
                  <hr className="border-border/50" />
                  
                  <div className="space-y-4 max-w-md">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Current Password</label>
                      <Input type="password" placeholder="••••••••" className="bg-background h-11 rounded-xl" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">New Password</label>
                      <Input type="password" placeholder="••••••••" className="bg-background h-11 rounded-xl" />
                    </div>
                    <div className="pt-2">
                      <Button text="Update Password" variant="secondary" className="rounded-full" />
                    </div>
                  </div>
                  
                  <div className="pt-8 border-t border-border/50 mt-8">
                    <h3 className="text-red-500 font-semibold mb-2">Danger Zone</h3>
                    <p className="text-sm text-muted-foreground mb-4">Permanently delete your account and all associated resumes.</p>
                    <button className="px-4 py-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg text-sm font-medium transition-colors">
                      Delete Account
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
