import { Navigate } from 'react-router';

/**
 * This is the index route for the /properties section.
 * It immediately redirects to the 'complexes' tab, which serves as the
 * default view for the properties page. The `replace` prop ensures that
 * this redirect page doesn't get added to the browser's history stack.
 */
export default function PropertiesIndex() {
  return <Navigate to="/dashboard/properties/complexes" replace />;
}