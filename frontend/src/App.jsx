import PromotionForm from "./components/PromotionForm";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-200 flex flex-col items-center justify-center p-6">

      <h1 className="text-4xl font-bold text-gray-800 mb-2">
        AI Promotion Prediction System
      </h1>

      <p className="text-gray-600 mb-8">
        Decision Tree Based Employee Promotion Analyzer
      </p>

      <PromotionForm />

    </div>
  );
}

export default App;