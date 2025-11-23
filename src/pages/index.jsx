import Layout from "./Layout.jsx";
import Homepage from "./Homepage";
import Welcome from "@/features/onboarding/pages/WelcomePage";

import Onboarding from "@/features/onboarding/pages/OnboardingPage";

import Success from "@/features/onboarding/pages/SuccessPage";

import Dashboard from "./Dashboard";

import Results from "./Results";

import MaterialLibrary from "@/features/materials/pages/MaterialLibraryPage";

import AdminDashboard from "@/features/admin/pages/DashboardPage";
import DossierDetail from "@/features/dossier/pages/DossierDetailPage";

import AdminQuestions from "@/features/admin/pages/QuestionsPage";

import MaterialSelector from "@/features/materials/pages/MaterialSelectorPage";

import APIStatus from "@/features/admin/pages/APIStatusPage";

import SalesPresentation from "@/features/sales/pages/SalesPresentationPage";

import StrategicResearch from "@/features/intelligence/pages/StrategicResearchPage";

import CustomerPortalPage from "./CustomerPortalPage";

import SalesHub from "@/features/sales/pages/SalesHubPage";

import IntelligenceCenter from "@/features/intelligence/pages/IntelligenceCenterPage";

import StrategyDashboard from "@/features/intelligence/pages/StrategyDashboardPage";

import PainPointsResearch from "./PainPointsResearch";

import UXDesignGuide from "./UXDesignGuide";

import PricingStrategy from "./PricingStrategy";

import ServicesCatalog from "./ServicesCatalog";

import ExecutionPlan from "./ExecutionPlan";

import StockSolution from "./StockSolution";

import StrategicVision from "./StrategicVision";

import FeatureLibrary from "@/features/admin/pages/FeatureLibraryPage";

import DatabaseSchema from "./DatabaseSchema";

import UserManagement from "@/features/admin/pages/UserManagementPage";

import Documentation from "@/features/admin/pages/DocumentationPage";

import ReferralCodes from "@/features/admin/pages/ReferralCodesPage";

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

const PAGES = {

    Homepage: Homepage,
    Welcome: Welcome,

    Onboarding: Onboarding,

    Success: Success,

    Dashboard: Dashboard,

    Results: Results,

    MaterialLibrary: MaterialLibrary,

    AdminDashboard: AdminDashboard,

    DossierDetail: DossierDetail,

    AdminQuestions: AdminQuestions,

    MaterialSelector: MaterialSelector,

    APIStatus: APIStatus,

    SalesPresentation: SalesPresentation,

    StrategicResearch: StrategicResearch,

    CustomerPortalPage: CustomerPortalPage,

    SalesHub: SalesHub,

    IntelligenceCenter: IntelligenceCenter,

    StrategyDashboard: StrategyDashboard,

    PainPointsResearch: PainPointsResearch,

    UXDesignGuide: UXDesignGuide,

    PricingStrategy: PricingStrategy,

    ServicesCatalog: ServicesCatalog,

    ExecutionPlan: ExecutionPlan,

    StockSolution: StockSolution,

    StrategicVision: StrategicVision,

    FeatureLibrary: FeatureLibrary,

    DatabaseSchema: DatabaseSchema,

    UserManagement: UserManagement,

    Documentation: Documentation,

    ReferralCodes: ReferralCodes,

}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || Object.keys(PAGES)[0];
}

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);

    // Homepage should render without Layout (no header/nav)
    if (location.pathname === '/') {
        return <Homepage />;
    }

    return (
        <Layout currentPageName={currentPage}>
            <Routes>
                <Route path="/Welcome" element={<Welcome />} />

                <Route path="/Onboarding" element={<Onboarding />} />

                <Route path="/Success" element={<Success />} />

                <Route path="/Dashboard" element={<Dashboard />} />

                <Route path="/Results" element={<Results />} />

                <Route path="/MaterialLibrary" element={<MaterialLibrary />} />

                <Route path="/AdminDashboard" element={<AdminDashboard />} />

                <Route path="/AdminQuestions" element={<AdminQuestions />} />

                <Route path="/MaterialSelector" element={<MaterialSelector />} />

                <Route path="/APIStatus" element={<APIStatus />} />

                <Route path="/SalesPresentation" element={<SalesPresentation />} />

                <Route path="/StrategicResearch" element={<StrategicResearch />} />

                <Route path="/CustomerPortalPage" element={<CustomerPortalPage />} />

                <Route path="/SalesHub" element={<SalesHub />} />

                <Route path="/IntelligenceCenter" element={<IntelligenceCenter />} />

                <Route path="/StrategyDashboard" element={<StrategyDashboard />} />

                <Route path="/PainPointsResearch" element={<PainPointsResearch />} />

                <Route path="/UXDesignGuide" element={<UXDesignGuide />} />

                <Route path="/PricingStrategy" element={<PricingStrategy />} />

                <Route path="/ServicesCatalog" element={<ServicesCatalog />} />

                <Route path="/ExecutionPlan" element={<ExecutionPlan />} />

                <Route path="/StockSolution" element={<StockSolution />} />

                <Route path="/StrategicVision" element={<StrategicVision />} />

                <Route path="/FeatureLibrary" element={<FeatureLibrary />} />

                <Route path="/DatabaseSchema" element={<DatabaseSchema />} />

                <Route path="/UserManagement" element={<UserManagement />} />

                <Route path="/Documentation" element={<Documentation />} />

                <Route path="/ReferralCodes" element={<ReferralCodes />} />

                <Route path="/DossierDetail/:id" element={<DossierDetail />} />

            </Routes>
        </Layout>
    );
}

export default function Pages() {
    return (
        <Router>
            <PagesContent />
        </Router>
    );
}