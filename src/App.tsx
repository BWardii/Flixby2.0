import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import UseCases from './pages/UseCases';
import RestaurantsUseCases from './pages/use-cases/Restaurants';
import HotelsResortsUseCases from './pages/use-cases/HotelsResorts';
import BeautyWellnessUseCases from './pages/use-cases/BeautyWellness';
import HealthcareUseCases from './pages/use-cases/Healthcare';
import Pricing from './pages/Pricing';
import Features from './pages/Features';
import MyAIAssistant from './pages/MyAIAssistant';
import CreateAssistant from './pages/assistant/CreateAssistant';
import ManageAssistant from './pages/assistant/ManageAssistant';
import CallLogs from './pages/assistant/CallLogs';
import Subscription from './pages/assistant/Subscription';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ResetPassword from './pages/ResetPassword';
import PlanSelection from './pages/PlanSelection';
import Contact from './pages/Contact';
import AuthProvider from './components/AuthProvider';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-900 text-white">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/use-cases" element={<UseCases />} />
            <Route path="/use-cases/restaurants" element={<RestaurantsUseCases />} />
            <Route path="/use-cases/hotels-resorts" element={<HotelsResortsUseCases />} />
            <Route path="/use-cases/beauty-wellness" element={<BeautyWellnessUseCases />} />
            <Route path="/use-cases/healthcare" element={<HealthcareUseCases />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/features" element={<Features />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/select-plan" element={<PlanSelection />} />
            <Route path="/my-assistant" element={<MyAIAssistant />}>
              <Route index element={<Navigate to="create" replace />} />
              <Route path="create" element={<CreateAssistant />} />
              <Route path="manage" element={<ManageAssistant />} />
              <Route path="calls" element={<CallLogs />} />
              <Route path="subscription" element={<Subscription />} />
            </Route>
          </Routes>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;