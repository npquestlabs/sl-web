import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { useEffect, useState } from "react";
import { dummyApi } from "@/api/dummy";
import { Button } from "@/components/ui/button";

export default function PropertiesLayout() {
  const location = useLocation();
  const params = useParams();
  const [complex, setComplex] = useState(null);
  const [unit, setUnit] = useState(null);

  useEffect(() => {
    async function fetchData() {
      if (params.complexId) {
        setComplex(await dummyApi.getComplex(params.complexId));
      } else {
        setComplex(null);
      }
      if (params.unitId) {
        setUnit(await dummyApi.getUnit(params.unitId));
      } else {
        setUnit(null);
      }
    }
    fetchData();
  }, [params.complexId, params.unitId]);

  return (
    <div className="space-y-8 p-6">
      <div className="flex items-center space-x-4 mb-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.history.back()}
        >
          ← Back
        </Button>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/dashboard/properties">Properties</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {complex && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to={`/dashboard/properties/${complex.id}`}>
                      {complex.name}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </>
            )}
            {unit && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Unit {unit.label}</BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <Outlet />
    </div>
  );
}
