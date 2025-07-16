import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Complex, Unit, Lease } from "@/types";
import { dummyApi } from "@/api/dummy";
import { format } from "date-fns";

export default function ComplexDetails() {
  const { complexId } = useParams<{ complexId: string }>();
  const [complex, setComplex] = useState<Complex | null>(null);
  const [units, setUnits] = useState<Unit[]>([]);
  const [leases, setLeases] = useState<Lease[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!complexId) return;
      try {
        const [complexData, unitsData, leasesData] = await Promise.all([
          dummyApi.getComplex(complexId),
          dummyApi.getComplexUnits(complexId),
          dummyApi.getLeases(),
        ]);
        setComplex(complexData);
        setUnits(unitsData);
        setLeases(
          leasesData.filter((lease) =>
            unitsData.some((unit) => unit.id === lease.unitId),
          ),
        );
      } catch (error) {
        console.error("Failed to fetch property details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [complexId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-muted-foreground">Loading property details...</div>
      </div>
    );
  }

  if (!complex) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-muted-foreground">Property not found</div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Complex Details</h1>
        <p className="text-muted-foreground mt-2">
          View and manage details for the complex.
        </p>
      </div>

      {/* Complex Information */}
      <Card>
        <CardHeader>
          <CardTitle>Complex Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Address
              </p>
              <p className="mt-1">{complex.address}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Description
              </p>
              <p className="mt-1">
                {complex.description || "No description available"}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Year Built
              </p>
              <p className="mt-1">2015</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Units Table */}
      <Card>
        <CardHeader>
          <CardTitle>Units</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Label</TableHead>
                <TableHead>Tenant</TableHead>
                <TableHead>Lease Start</TableHead>
                <TableHead>Lease End</TableHead>
                <TableHead>Rent</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {units.map((unit) => {
                const lease = leases.find(
                  (l) => l.unitId === unit.id && l.status === "active",
                );
                return (
                  <TableRow
                    key={unit.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => navigate(`./units/${unit.id}`)}
                  >
                    <TableCell className="font-medium">{unit.label}</TableCell>
                    <TableCell>
                      {lease?.tenant ? (
                        <span className="text-blue-600">
                          {lease.tenant.firstName} {lease.tenant.lastName}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">Vacant</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {lease
                        ? format(new Date(lease.startedAt), "yyyy-MM-dd")
                        : "-"}
                    </TableCell>
                    <TableCell>
                      {lease
                        ? format(new Date(lease.endsAt), "yyyy-MM-dd")
                        : "-"}
                    </TableCell>
                    <TableCell>${unit.rentAmount.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant={lease ? "default" : "secondary"}>
                        {lease ? "Occupied" : "Vacant"}
                      </Badge>
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
