"use client"

import { useEffect, useState } from "react"
import { FileText, LayoutTemplate, PlusCircle, Layout, UploadCloud, Trash2, Edit3, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { getAuth, onAuthStateChanged, User } from "firebase/auth"
import { collection, query, getDocs, orderBy, deleteDoc, doc } from "firebase/firestore"
import { auth, db } from "@/app/firebaseConfig"
import { MotionButton } from "../components/ui/MotionButton"

// Define resume type based on what we'd save in Firestore
type SavedResume = {
  id: string;
  templateId: string;
  name: string;
  updatedAt: any;
  personal: any;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [resumes, setResumes] = useState<SavedResume[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      router.push("/signin");
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        await fetchResumes(currentUser.uid);
      } else {
        router.push("/signin");
      }
    });
    return () => unsubscribe();
  }, [router]);

  const fetchResumes = async (userId: string) => {
    try {
      setLoading(true);
      const q = query(collection(db, "users", userId, "resumes"), orderBy("updatedAt", "desc"));
      const querySnapshot = await getDocs(q);
      const fetchedResumes: SavedResume[] = [];
      querySnapshot.forEach((doc) => {
        fetchedResumes.push({ id: doc.id, ...doc.data() } as SavedResume);
      });
      setResumes(fetchedResumes);
    } catch (error) {
      console.error("Error fetching resumes: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (resumeId: string) => {
    if (!user || !confirm("Are you sure you want to delete this resume?")) return;
    try {
      await deleteDoc(doc(db, "users", user.uid, "resumes", resumeId));
      setResumes(prev => prev.filter(r => r.id !== resumeId));
    } catch (error) {
      console.error("Error deleting resume: ", error);
    }
  };

  const stats = [
    { label: "Resumes Created", value: loading ? "-" : resumes.length.toString(), icon: FileText },
    { label: "Templates Used", value: loading ? "-" : new Set(resumes.map(r => r.templateId)).size.toString(), icon: LayoutTemplate },
  ]

  const actions = [
    {
      title: "Create Resume",
      description: "Build a new resume from scratch.",
      icon: PlusCircle,
      href: "/templates",
      color: "text-indigo-500",
      bg: "bg-indigo-500/10",
      border: "border-indigo-500/20"
    },
    {
      title: "Use Template",
      description: "Choose from our premium collection.",
      icon: Layout,
      href: "/templates",
      color: "text-purple-500",
      bg: "bg-purple-500/10",
      border: "border-purple-500/20"
    },
    {
      title: "Upload Resume",
      description: "Import your existing resume.",
      icon: UploadCloud,
      href: "/upload",
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20"
    }
  ]

  return (
    <div className="relative min-h-screen">
      {/* Subtle Background Pattern matching Homepage */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <div className="max-w-6xl mx-auto space-y-8 pt-6 pb-16 px-4 md:px-8">
        {/* Welcome Section */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Welcome back{user?.displayName ? `, ${user.displayName.split(' ')[0]}` : ''}!
            </h1>
            <p className="text-muted-foreground mt-2">Here is what is happening with your resumes today.</p>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl"
        >
          {stats.map((stat, i) => (
            <div key={i} className="bg-card border border-border/50 shadow-sm rounded-3xl p-6 flex items-center gap-5 transition-all duration-300 hover:shadow-md hover:border-primary/50 group">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors duration-500">
                <stat.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-bold text-foreground mb-5">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {actions.map((action, i) => (
              <Link key={i} href={action.href} className="block group">
                <div className="bg-card border border-border/50 shadow-sm rounded-3xl p-6 flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:border-primary/50 hover:-translate-y-1 relative overflow-hidden">
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-transparent to-${action.color.split('-')[1]}-500/10 rounded-full blur-3xl -mr-10 -mt-10 transition-opacity opacity-0 group-hover:opacity-100`}></div>
                  
                  <div className={`w-14 h-14 rounded-2xl ${action.bg} ${action.border} border flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500`}>
                    <action.icon className={`w-7 h-7 ${action.color}`} />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{action.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-2">{action.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-xl font-bold text-foreground mb-5">Recent Resumes</h2>
          
          <div className="bg-card border border-border/50 shadow-sm rounded-3xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 relative z-10">
                <Loader2 className="w-8 h-8 text-primary animate-spin mb-4" />
                <p className="text-muted-foreground font-medium">Loading your resumes...</p>
              </div>
            ) : resumes.length > 0 ? (
              <div className="divide-y divide-border/50 relative z-10">
                <AnimatePresence>
                  {resumes.map((resume) => (
                    <motion.div 
                      key={resume.id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-6 flex flex-col sm:flex-row items-center justify-between gap-6 hover:bg-secondary/30 transition-colors"
                    >
                      <div className="flex items-center gap-5 w-full sm:w-auto">
                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0 border border-primary/20">
                          <FileText className="w-8 h-8 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-foreground mb-1">
                            {resume.personal?.name ? `${resume.personal.name}'s Resume` : resume.name || "Untitled Resume"}
                          </h3>
                          <p className="text-muted-foreground text-sm flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                            Template: <span className="capitalize">{resume.templateId.replace(/-/g, ' ')}</span>
                            <span className="hidden sm:inline">• Last edited {new Date(resume.updatedAt?.seconds * 1000).toLocaleDateString()}</span>
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                        <button 
                          onClick={() => router.push(`/editor/${resume.templateId}?resumeId=${resume.id}`)}
                          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors"
                        >
                          <Edit3 className="w-4 h-4" /> Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(resume.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 rounded-xl text-sm font-medium hover:bg-red-500 hover:text-white transition-colors"
                        >
                          <Trash2 className="w-4 h-4" /> Delete
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center px-4 relative z-10">
                <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-6">
                  <LayoutTemplate className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">No resumes yet</h3>
                <p className="text-muted-foreground mb-8 max-w-sm">You haven't created any resumes yet. Start building your professional profile today.</p>
                <MotionButton 
                  label="Create Your First Resume" 
                  onClick={() => router.push('/templates')} 
                  className="px-8"
                />
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
