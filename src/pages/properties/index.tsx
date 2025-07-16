import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Plus } from "lucide-react";
import { Complex } from "@/types";
import { dummyApi } from "@/api/dummy";

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
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-3 font-medium text-muted-foreground">
                    Name
                  </th>
                  <th className="pb-3 font-medium text-muted-foreground">
                    Address
                  </th>
                  <th className="pb-3 font-medium text-muted-foreground">
                    Units
                  </th>
                  <th className="pb-3 font-medium text-muted-foreground">
                    Occupancy
                  </th>
                  <th className="pb-3 font-medium text-muted-foreground">
                    Status
                  </th>
                  {/* Removed Actions column for premium row-click UX */}
                </tr>
              </thead>
              <tbody>
                {filteredComplexes.map((complex, index) => {
                  const occupancyRate = complex.totalUnits
                    ? Math.round(
                        (complex.occupiedUnits! / complex.totalUnits) * 100,
                      )
                    : 0;

                  return (
                    <tr
                      key={complex.id}
                      className="border-b text-left hover:bg-muted/40 cursor-pointer transition"
                      onClick={() => navigate(`./${complex.id}`)}
                    >
                      <td className="pb-3 font-medium text-muted-foreground">
                        {complex.name}
                      </td>
                      <td className="pb-3 font-medium text-muted-foreground">
                        {complex.address}
                      </td>
                      <td className="pb-3 font-medium text-muted-foreground">
                        {complex.totalUnits}
                      </td>
                      <td className="pb-3 font-medium text-muted-foreground">
                        {occupancyRate}%
                      </td>
                      <td className="pb-3 font-medium text-muted-foreground">
                        {complex.occupiedUnits < complex.totalUnits
                          ? "Available"
                          : "Full"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
