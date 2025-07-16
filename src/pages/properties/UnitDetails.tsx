import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Unit, Lease, Complex } from "@/types";
import { dummyApi } from "@/api/dummy";
import { format } from "date-fns";
import { WashingMachine, Shirt, UtensilsCrossed, Wind } from "lucide-react";

const featureIcons: { [key: string]: React.ElementType } = {
  "In-unit Washer": WashingMachine,
  "In-unit Dryer": Shirt,
  Dishwasher: UtensilsCrossed,
  "Central Air": Wind,
};

export default function UnitDetails() {
  const { complexId, unitId } = useParams<{
    complexId: string;
    unitId: string;
  }>();
  const [unit, setUnit] = useState<Unit | null>(null);
  const [lease, setLease] = useState<Lease | null>(null);
  const [complex, setComplex] = useState<Complex | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!unitId) return;
      try {
        const unitData = await dummyApi.getUnit(unitId);
        setUnit(unitData);
        setLease(await dummyApi.getUnitLease(unitId));
        setComplex(await dummyApi.getComplex(unitData.complexId));
      } catch (error) {
        console.error("Failed to fetch unit details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [unitId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-muted-foreground">Loading unit details...</div>
      </div>
    );
  }

  if (!unit) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-muted-foreground">Unit not found</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Unit {unit.label}</h1>
        <p className="text-muted-foreground mt-2">
          {unit.bedrooms} Bedroom, {unit.bathrooms} Bath
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="lease">Lease</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Unit Details */}
          <Card>
            <CardHeader>
              <CardTitle>Unit Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Label
                  </p>
                  <p className="mt-1 font-medium">{unit.label}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Square Footage
                  </p>
                  <p className="mt-1">{unit.squareFootage} sq ft</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Bedrooms
                  </p>
                  <p className="mt-1">{unit.bedrooms}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Bathrooms
                  </p>
                  <p className="mt-1">{unit.bathrooms}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle>Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {unit.features?.map((feature) => {
                  const IconComponent = featureIcons[feature] || Wind;
                  return (
                    <div
                      key={feature}
                      className="flex items-center space-x-3 p-3 border rounded-lg"
                    >
                      <IconComponent className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm font-medium">{feature}</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Lease Details */}
          <Card>
            <CardHeader>
              <CardTitle>Lease Details</CardTitle>
            </CardHeader>
            <CardContent>
              {lease ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Tenant
                      </p>
                      <p className="mt-1">
                        {lease.tenant?.firstName} {lease.tenant?.lastName}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Lease Start
                      </p>
                      <p className="mt-1">
                        {format(new Date(lease.startedAt), "MMMM d, yyyy")}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Lease End
                      </p>
                      <p className="mt-1">
                        {format(new Date(lease.endsAt), "MMMM d, yyyy")}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Monthly Rent
                    </p>
                    <p className="mt-1 text-lg font-semibold">
                      ${lease.rentAmount.toLocaleString()}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">
                    No active lease for this unit.
                  </p>
                  <Button>Create Lease</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lease">
          <Card>
            <CardHeader>
              <CardTitle>Lease Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Lease management features coming soon...
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Payment tracking features coming soon...
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
