import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import { Lease } from "@/types";
import { dummyApi } from "@/api/dummy";
import { format } from "date-fns";

export default function Leases() {
  const [leases, setLeases] = useState<Lease[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchLeases = async () => {
      try {
        const data = await dummyApi.getLeases();
        setLeases(data);
      } catch (error) {
        console.error("Failed to fetch leases:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeases();
  }, []);

  const filteredLeases = leases.filter(
    (lease) =>
      lease.tenant?.firstName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      lease.tenant?.lastName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      lease.unitId.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-muted-foreground">Loading leases...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leases</h1>
          <p className="text-muted-foreground mt-2">
            Manage all your property leases
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Lease
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search leases"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Leases Table */}
      <Card>
        <CardHeader>
          <CardTitle>Active Leases</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Unit</TableHead>
                <TableHead>Tenant</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Monthly Rent</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeases.map((lease) => (
                <TableRow key={lease.id}>
                  <TableCell className="font-medium">
                    Unit {lease.unitId}
                  </TableCell>
                  <TableCell>
                    {lease.tenant?.firstName} {lease.tenant?.lastName}
                  </TableCell>
                  <TableCell>
                    {format(new Date(lease.startedAt), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell>
                    {format(new Date(lease.endsAt), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell>${lease.rentAmount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        lease.status === "active" ? "default" : "secondary"
                      }
                    >
                      {lease.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
