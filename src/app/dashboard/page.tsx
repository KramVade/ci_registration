"use client";

import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { collection, getDocs, query, orderBy, doc, updateDoc, deleteDoc, limit, startAfter, QueryDocumentSnapshot, DocumentData, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { EditRegistrationDialog } from "@/components/edit-registration-dialog";
import { Pencil, Trash2, Eye, Download, ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

type Registration = {
  id: string;
  pangalan: string;
  email: string;
  palayaw: string;
  kaarawan: string;
  edad: string;
  kasarian: string;
  tirahan: string;
  contactNumber: string;
  inabot: string;
  tatay: string;
  nanay: string;
  localChurch: string;
  kasapian: string;
  posisyonIglesya?: string;
  posisyonOrganisasyon?: string;
  ilangBeses: string;
  mgaInaasahan: string;
  ambagCash?: string;
  ambagRice?: string;
  ambagInKinds?: string;
  plato?: string;
  kutsara?: string;
  baso?: string;
  beddings?: string;
  paymentStatus?: string;
};

export default function DashboardPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [allRegistrations, setAllRegistrations] = useState<Registration[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [editingRegistration, setEditingRegistration] = useState<Registration | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [viewingRegistration, setViewingRegistration] = useState<Registration | null>(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [firstVisible, setFirstVisible] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [pageSnapshots, setPageSnapshots] = useState<Map<number, QueryDocumentSnapshot<DocumentData>>>(new Map());
  
  // Search state
  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState("all");
  const [filteredRegistrations, setFilteredRegistrations] = useState<Registration[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      fetchTotalCount();
      if (!isSearching) {
        fetchRegistrations();
      }
    }
  }, [user, currentPage, itemsPerPage]);

  useEffect(() => {
    if (searchTerm.trim()) {
      handleSearch();
    } else {
      setIsSearching(false);
      setFilteredRegistrations([]);
      setCurrentPage(1);
      if (user) {
        fetchRegistrations();
      }
    }
  }, [searchTerm, searchField]);

  const fetchTotalCount = async () => {
    try {
      const q = query(collection(db, "registrations"));
      const querySnapshot = await getDocs(q);
      setTotalItems(querySnapshot.size);
      
      // Store all registrations for export functionality
      const allData: Registration[] = [];
      querySnapshot.forEach((doc) => {
        allData.push({ id: doc.id, ...doc.data() } as Registration);
      });
      setAllRegistrations(allData);
    } catch (error) {
      console.error("Error fetching total count:", error);
    }
  };

  const fetchRegistrations = async (direction: 'next' | 'prev' | 'first' = 'first') => {
    try {
      setLoadingData(true);
      let q;

      if (direction === 'first' || currentPage === 1) {
        // First page
        q = query(
          collection(db, "registrations"), 
          orderBy("pangalan"), 
          limit(itemsPerPage)
        );
      } else if (direction === 'next' && lastVisible) {
        // Next page
        q = query(
          collection(db, "registrations"), 
          orderBy("pangalan"), 
          startAfter(lastVisible),
          limit(itemsPerPage)
        );
      } else if (direction === 'prev') {
        // Previous page - use stored snapshot
        const prevSnapshot = pageSnapshots.get(currentPage - 1);
        if (prevSnapshot) {
          q = query(
            collection(db, "registrations"), 
            orderBy("pangalan"), 
            startAfter(prevSnapshot),
            limit(itemsPerPage)
          );
        } else {
          // Fallback to first page
          q = query(
            collection(db, "registrations"), 
            orderBy("pangalan"), 
            limit(itemsPerPage)
          );
        }
      }

      if (q) {
        const querySnapshot = await getDocs(q);
        const data: Registration[] = [];
        
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() } as Registration);
        });

        setRegistrations(data);
        
        // Update pagination cursors
        if (querySnapshot.docs.length > 0) {
          setFirstVisible(querySnapshot.docs[0]);
          setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
          
          // Store snapshot for this page
          if (querySnapshot.docs.length > 0) {
            const newPageSnapshots = new Map(pageSnapshots);
            newPageSnapshots.set(currentPage, querySnapshot.docs[0]);
            setPageSnapshots(newPageSnapshots);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching registrations:", error);
    } finally {
      setLoadingData(false);
    }
  };

  const handleSaveEdit = async (id: string, data: Omit<Registration, "id">) => {
    try {
      await updateDoc(doc(db, "registrations", id), data);
      toast({
        title: "Success",
        description: "Registration updated successfully!",
      });
      fetchTotalCount();
      fetchRegistrations();
    } catch (error) {
      console.error("Error updating:", error);
      toast({
        title: "Error",
        description: "Failed to update registration.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "registrations", id));
      toast({
        title: "Success",
        description: "Registration deleted successfully!",
      });
      
      // Reset to first page if current page becomes empty
      const newTotal = totalItems - 1;
      const maxPage = Math.ceil(newTotal / itemsPerPage);
      if (currentPage > maxPage && maxPage > 0) {
        setCurrentPage(maxPage);
      }
      
      fetchTotalCount();
      fetchRegistrations();
      setDeletingId(null);
    } catch (error) {
      console.error("Error deleting:", error);
      toast({
        title: "Error",
        description: "Failed to delete registration.",
        variant: "destructive",
      });
    }
  };

  const handleTogglePayment = async (id: string, currentStatus?: string) => {
    try {
      const newStatus = currentStatus === "paid" ? "unpaid" : "paid";
      await updateDoc(doc(db, "registrations", id), { paymentStatus: newStatus });
      toast({
        title: "Success",
        description: `Payment status updated to ${newStatus}!`,
      });
      fetchTotalCount();
      fetchRegistrations();
    } catch (error) {
      console.error("Error updating payment:", error);
      toast({
        title: "Error",
        description: "Failed to update payment status.",
        variant: "destructive",
      });
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage === currentPage) return;
    
    setCurrentPage(newPage);
    
    // If searching, pagination is handled client-side
    if (isSearching) {
      return;
    }
    
    // For regular pagination, use Firestore pagination
    if (newPage > currentPage) {
      fetchRegistrations('next');
    } else if (newPage < currentPage) {
      fetchRegistrations('prev');
    }
  };

  const handleItemsPerPageChange = (newItemsPerPage: string) => {
    setItemsPerPage(parseInt(newItemsPerPage));
    setCurrentPage(1);
    setPageSnapshots(new Map());
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setIsSearching(false);
      setFilteredRegistrations([]);
      return;
    }

    setIsSearching(true);
    setLoadingData(true);

    try {
      // For client-side search, we'll use the allRegistrations data
      const searchTermLower = searchTerm.toLowerCase();
      
      let filtered = allRegistrations.filter((reg) => {
        if (searchField === "all") {
          // Search across multiple fields
          return (
            reg.pangalan?.toLowerCase().includes(searchTermLower) ||
            reg.email?.toLowerCase().includes(searchTermLower) ||
            reg.palayaw?.toLowerCase().includes(searchTermLower) ||
            reg.contactNumber?.includes(searchTerm) ||
            reg.localChurch?.toLowerCase().includes(searchTermLower) ||
            reg.kasapian?.toLowerCase().includes(searchTermLower) ||
            reg.tirahan?.toLowerCase().includes(searchTermLower)
          );
        } else {
          // Search specific field
          const fieldValue = reg[searchField as keyof Registration];
          return fieldValue?.toString().toLowerCase().includes(searchTermLower);
        }
      });

      setFilteredRegistrations(filtered);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error searching:", error);
      toast({
        title: "Error",
        description: "Failed to search registrations.",
        variant: "destructive",
      });
    } finally {
      setLoadingData(false);
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    setIsSearching(false);
    setFilteredRegistrations([]);
    setCurrentPage(1);
  };

  const exportToCSV = () => {
    if (allRegistrations.length === 0) {
      toast({
        title: "No Data",
        description: "There are no registrations to export.",
        variant: "destructive",
      });
      return;
    }

    // Define CSV headers
    const headers = [
      "Pangalan",
      "Email",
      "Palayaw",
      "Kaarawan",
      "Edad",
      "Kasarian",
      "Tirahan",
      "Contact Number",
      "Inabot na Pag-aaral",
      "Tatay",
      "Nanay",
      "Local Church",
      "Kasapian",
      "Posisyon (Iglesya)",
      "Posisyon (Organisasyon)",
      "Ilang Beses",
      "Mga Inaasahan",
      "Ambag Cash",
      "Ambag Rice",
      "Ambag In-Kinds",
      "Plato",
      "Kutsara",
      "Baso",
      "Beddings",
      "Payment Status",
    ];

    // Convert registrations to CSV rows
    const rows = allRegistrations.map((reg) => [
      reg.pangalan,
      reg.email,
      reg.palayaw,
      reg.kaarawan,
      reg.edad,
      reg.kasarian,
      reg.tirahan,
      reg.contactNumber,
      reg.inabot,
      reg.tatay,
      reg.nanay,
      reg.localChurch,
      reg.kasapian,
      reg.posisyonIglesya || "",
      reg.posisyonOrganisasyon || "",
      reg.ilangBeses,
      reg.mgaInaasahan,
      reg.ambagCash || "",
      reg.ambagRice || "",
      reg.ambagInKinds || "",
      reg.plato === "true" ? "Yes" : "No",
      reg.kutsara === "true" ? "Yes" : "No",
      reg.baso === "true" ? "Yes" : "No",
      reg.beddings === "true" ? "Yes" : "No",
      reg.paymentStatus === "paid" ? "Paid" : "Unpaid",
    ]);

    // Combine headers and rows
    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
      ),
    ].join("\n");

    // Create blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `registrations_${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Success",
      description: "Registrations exported successfully!",
    });
  };

  // Calculate pagination info
  const displayedRegistrations = isSearching ? filteredRegistrations : registrations;
  const displayedTotal = isSearching ? filteredRegistrations.length : totalItems;
  const totalPages = Math.ceil(displayedTotal / itemsPerPage);
  
  // For search results, we need to paginate the filtered results client-side
  const paginatedSearchResults = isSearching 
    ? filteredRegistrations.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : registrations;
  
  const finalDisplayedRegistrations = isSearching ? paginatedSearchResults : registrations;
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, displayedTotal);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Officer Dashboard</h1>
          <p className="text-muted-foreground">Welcome, {user.email}</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={exportToCSV} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export to CSV
          </Button>
          <Button onClick={logout} variant="outline">
            Logout
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Registrations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalItems}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Paid</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {allRegistrations.filter(r => r.paymentStatus === "paid").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Baptized Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {allRegistrations.filter(r => r.kasapian === "Baptized").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Professing Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {allRegistrations.filter(r => r.kasapian === "Professing").length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Registrations</CardTitle>
                <CardDescription>
                  List of all registered participants for Christmas Institute 2025
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Items per page:</span>
                <Select value={itemsPerPage.toString()} onValueChange={handleItemsPerPageChange}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Search Controls */}
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search registrations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-10"
                />
                {searchTerm && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearSearch}
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              <Select value={searchField} onValueChange={setSearchField}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Fields</SelectItem>
                  <SelectItem value="pangalan">Name</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="palayaw">Nickname</SelectItem>
                  <SelectItem value="contactNumber">Contact</SelectItem>
                  <SelectItem value="localChurch">Church</SelectItem>
                  <SelectItem value="kasapian">Membership</SelectItem>
                  <SelectItem value="tirahan">Address</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {isSearching && (
              <div className="text-sm text-muted-foreground">
                Found {filteredRegistrations.length} result{filteredRegistrations.length !== 1 ? 's' : ''} for "{searchTerm}"
                {searchField !== "all" && ` in ${searchField}`}
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {loadingData ? (
            <div className="flex items-center justify-center py-8">
              <p>Loading registrations...</p>
            </div>
          ) : finalDisplayedRegistrations.length === 0 ? (
            <div className="text-center py-8">
              {isSearching ? (
                <div>
                  <p className="text-muted-foreground mb-2">No registrations found for "{searchTerm}"</p>
                  <Button variant="outline" onClick={clearSearch}>
                    Clear Search
                  </Button>
                </div>
              ) : (
                <p className="text-muted-foreground">No registrations yet.</p>
              )}
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Pangalan</th>
                      <th className="text-left p-2">Email</th>
                      <th className="text-left p-2">Palayaw</th>
                      <th className="text-left p-2">Edad</th>
                      <th className="text-left p-2">Contact</th>
                      <th className="text-left p-2">Local Church</th>
                      <th className="text-left p-2">Kasapian</th>
                      <th className="text-left p-2">Payment</th>
                      <th className="text-left p-2">Ambag</th>
                      <th className="text-left p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {finalDisplayedRegistrations.map((reg) => (
                      <tr key={reg.id} className="border-b hover:bg-muted/50">
                        <td className="p-2">{reg.pangalan}</td>
                        <td className="p-2">{reg.email}</td>
                        <td className="p-2">{reg.palayaw}</td>
                        <td className="p-2">{reg.edad}</td>
                        <td className="p-2">{reg.contactNumber}</td>
                        <td className="p-2">{reg.localChurch}</td>
                        <td className="p-2">
                          <span className={`px-2 py-1 rounded text-xs ${
                            reg.kasapian === "Baptized" 
                              ? "bg-green-100 text-green-800" 
                              : "bg-blue-100 text-blue-800"
                          }`}>
                            {reg.kasapian}
                          </span>
                        </td>
                        <td className="p-2">
                          <Button
                            size="sm"
                            variant={reg.paymentStatus === "paid" ? "default" : "outline"}
                            className={reg.paymentStatus === "paid" ? "bg-green-600 hover:bg-green-700" : ""}
                            onClick={() => handleTogglePayment(reg.id, reg.paymentStatus)}
                          >
                            {reg.paymentStatus === "paid" ? "Paid" : "Unpaid"}
                          </Button>
                        </td>
                        <td className="p-2">
                          <div className="text-xs">
                            {reg.ambagCash && <div>Reg: ₱{reg.ambagCash}</div>}
                            {reg.ambagRice && <div>Bigas: {reg.ambagRice}kg</div>}
                            {reg.ambagInKinds && <div className="text-muted-foreground">{reg.ambagInKinds}</div>}
                          </div>
                        </td>
                        <td className="p-2">
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setViewingRegistration(reg)}
                              title="View Details"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setEditingRegistration(reg)}
                              title="Edit"
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => setDeletingId(reg.id)}
                              title="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination Controls */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <div className="text-sm text-muted-foreground">
                  Showing {startItem} to {endItem} of {displayedTotal} {isSearching ? 'filtered ' : ''}registrations
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1 || loadingData}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      
                      return (
                        <Button
                          key={pageNum}
                          variant={currentPage === pageNum ? "default" : "outline"}
                          size="sm"
                          onClick={() => handlePageChange(pageNum)}
                          disabled={loadingData}
                          className="w-8 h-8 p-0"
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages || loadingData}
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <EditRegistrationDialog
        registration={editingRegistration}
        open={!!editingRegistration}
        onOpenChange={(open) => !open && setEditingRegistration(null)}
        onSave={handleSaveEdit}
      />

      <AlertDialog open={!!deletingId} onOpenChange={(open) => !open && setDeletingId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the registration.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletingId && handleDelete(deletingId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={!!viewingRegistration} onOpenChange={(open) => !open && setViewingRegistration(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Registration Details</DialogTitle>
          </DialogHeader>
          {viewingRegistration && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-3">Personal Information</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><span className="font-medium">Pangalan:</span> {viewingRegistration.pangalan}</div>
                  <div><span className="font-medium">Email:</span> {viewingRegistration.email}</div>
                  <div><span className="font-medium">Palayaw:</span> {viewingRegistration.palayaw}</div>
                  <div><span className="font-medium">Kaarawan:</span> {viewingRegistration.kaarawan}</div>
                  <div><span className="font-medium">Edad:</span> {viewingRegistration.edad}</div>
                  <div><span className="font-medium">Kasarian:</span> {viewingRegistration.kasarian}</div>
                  <div className="col-span-2"><span className="font-medium">Tirahan:</span> {viewingRegistration.tirahan}</div>
                  <div><span className="font-medium">Contact:</span> {viewingRegistration.contactNumber}</div>
                  <div><span className="font-medium">Pag-aaral:</span> {viewingRegistration.inabot}</div>
                  <div><span className="font-medium">Tatay:</span> {viewingRegistration.tatay}</div>
                  <div><span className="font-medium">Nanay:</span> {viewingRegistration.nanay}</div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3">Church Information</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><span className="font-medium">Local Church:</span> {viewingRegistration.localChurch}</div>
                  <div><span className="font-medium">Kasapian:</span> {viewingRegistration.kasapian}</div>
                  <div><span className="font-medium">Posisyon (Iglesya):</span> {viewingRegistration.posisyonIglesya || "N/A"}</div>
                  <div><span className="font-medium">Posisyon (Org):</span> {viewingRegistration.posisyonOrganisasyon || "N/A"}</div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3">Event Information</h3>
                <div className="space-y-2 text-sm">
                  <div><span className="font-medium">Ilang Beses:</span> {viewingRegistration.ilangBeses}</div>
                  <div><span className="font-medium">Mga Inaasahan:</span> {viewingRegistration.mgaInaasahan}</div>
                  <div>
                    <span className="font-medium">Payment Status:</span>{" "}
                    <span className={`px-2 py-1 rounded text-xs ${
                      viewingRegistration.paymentStatus === "paid"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {viewingRegistration.paymentStatus === "paid" ? "Paid" : "Unpaid"}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3">Ambag (Contribution)</h3>
                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div><span className="font-medium">Cash:</span> {viewingRegistration.ambagCash ? `₱${viewingRegistration.ambagCash}` : "N/A"}</div>
                  <div><span className="font-medium">Rice:</span> {viewingRegistration.ambagRice ? `${viewingRegistration.ambagRice} kg` : "N/A"}</div>
                  <div className="col-span-3"><span className="font-medium">In-Kinds:</span> {viewingRegistration.ambagInKinds || "N/A"}</div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3">Mga Gamit na Dala</h3>
                <div className="flex gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" checked={viewingRegistration.plato === "true"} disabled className="h-4 w-4" />
                    <span>Plato</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" checked={viewingRegistration.kutsara === "true"} disabled className="h-4 w-4" />
                    <span>Kutsara</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" checked={viewingRegistration.baso === "true"} disabled className="h-4 w-4" />
                    <span>Baso</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" checked={viewingRegistration.beddings === "true"} disabled className="h-4 w-4" />
                    <span>Beddings</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
