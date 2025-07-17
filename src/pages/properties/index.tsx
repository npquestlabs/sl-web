import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Plus } from "lucide-react";
import { Complex } from "@/types";
import { dummyApi } from "@/api/dummy";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function Properties() {
  const [complexes, setComplexes] = useState<Complex[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComplexes = async () => {
      try {
        const data = await dummyApi.getComplexes();
        setComplexes(data);
      } catch (error) {
        console.error("Failed to fetch complexes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComplexes();
  }, []);

  const filteredComplexes = complexes.filter(
    (complex) =>
      complex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complex.address.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-muted-foreground">Loading properties...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Properties</h1>
        </div>
        <Button asChild>
          <Link to="/dashboard/properties/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Property
          </Link>
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search properties"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Properties Table */}
      <Card>
        <CardHeader>
          <CardTitle>Properties</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Units</TableHead>
                <TableHead>Occupancy</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredComplexes.map((complex, index) => {
                const occupancyRate = complex.totalUnits
                  ? Math.round(
                    (complex.occupiedUnits! / complex.totalUnits) * 100,
                  )
                  : 0;

                return (
                  <TableRow
                    key={complex.id}
                    className="border-b text-left hover:bg-muted/40 cursor-pointer transition"
                    onClick={() => navigate(`./${complex.id}`)}
                  >
                    <TableCell className="pb-3 font-medium text-muted-foreground">
                      {complex.name}
                    </TableCell>
                    <TableCell className="pb-3 font-medium text-muted-foreground">
                      {complex.address}
                    </TableCell>
                    <TableCell className="pb-3 font-medium text-muted-foreground">
                      {complex.totalUnits}
                    </TableCell>
                    <TableCell className="pb-3 font-medium text-muted-foreground">
                      {occupancyRate}%
                    </TableCell>
                  </TableRow>
                );
              })}

            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
