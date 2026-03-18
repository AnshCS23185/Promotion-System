import { useState } from "react";
import { predictPromotion } from "../api/api";

function PromotionForm() {

  const [formData, setFormData] = useState({
    satisfaction_level: "",
    last_evaluation: "",
    number_project: "",
    average_montly_hours: "",
    time_spend_company: "",
    Work_accident: "",
    sales: "",
    salary: ""
  });

  const [result, setResult] = useState("");
  const [probability, setProbability] = useState(null);
  const [treeImage, setTreeImage] = useState("");
  const [importanceImage, setImportanceImage] = useState("");

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value === "" ? "" : Number(value)
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await predictPromotion(formData);

      setResult(response.prediction);
      setProbability(response.promotion_probability);
      setTreeImage(response.decision_tree_image);
      setImportanceImage(response.feature_importance_image);

    } catch (error) {

      console.error(error);
      setResult("Error connecting to API");

    }
  };

  return (
    <div className="w-[900px] bg-white shadow-2xl rounded-2xl p-8">

      <h2 className="text-3xl font-bold text-center mb-8">
        AI Promotion Prediction System
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">

        <div>
          <label>Satisfaction Level</label>
          <input
            type="number"
            step="0.01"
            name="satisfaction_level"
            onChange={handleChange}
            className="border p-3 rounded-lg w-full"
          />
        </div>

        <div>
          <label>Last Evaluation</label>
          <input
            type="number"
            step="0.01"
            name="last_evaluation"
            onChange={handleChange}
            className="border p-3 rounded-lg w-full"
          />
        </div>

        <div>
          <label>Number of Projects</label>
          <input
            type="number"
            name="number_project"
            onChange={handleChange}
            className="border p-3 rounded-lg w-full"
          />
        </div>

        <div>
          <label>Average Monthly Hours</label>
          <input
            type="number"
            name="average_montly_hours"
            onChange={handleChange}
            className="border p-3 rounded-lg w-full"
          />
        </div>

        <div>
          <label>Years in Company</label>
          <input
            type="number"
            name="time_spend_company"
            onChange={handleChange}
            className="border p-3 rounded-lg w-full"
          />
        </div>

        <div>
          <label>Work Accident (0 = No, 1 = Yes)</label>
          <input
            type="number"
            min="0"
            max="1"
            name="Work_accident"
            onChange={handleChange}
            className="border p-3 rounded-lg w-full"
          />
        </div>

        <div>
          <label>Department Code (0–9)</label>
          <input
            type="number"
            min="0"
            max="9"
            name="sales"
            onChange={handleChange}
            className="border p-3 rounded-lg w-full"
          />
        </div>

        <div>
          <label>Salary Level (0 = Low, 1 = Medium, 2 = High)</label>
          <input
            type="number"
            min="0"
            max="2"
            name="salary"
            onChange={handleChange}
            className="border p-3 rounded-lg w-full"
          />
        </div>

        <button
          type="submit"
          className="col-span-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg"
        >
          Predict Promotion
        </button>

      </form>

      {result && (

        <div className="mt-8 space-y-6">

          <div className={`p-6 rounded-xl text-center text-xl font-semibold ${
            result.includes("NOT")
              ? "bg-red-100 text-red-600"
              : "bg-green-100 text-green-700"
          }`}>
            {result}
          </div>

          <div>

            <p className="font-semibold">
              Promotion Probability: {probability}%
            </p>

            <div className="w-full bg-gray-200 rounded-full h-4 mt-2">

              <div
                className="bg-blue-500 h-4 rounded-full"
                style={{ width: `${probability}%` }}
              />

            </div>

          </div>

          <div>
            <h3 className="text-xl font-semibold">Feature Importance</h3>
            <img src={importanceImage} className="rounded-lg shadow-lg mt-2" />
          </div>

          <div>
            <h3 className="text-xl font-semibold">Decision Tree Visualization</h3>
            <img src={treeImage} className="rounded-lg shadow-lg mt-2" />
          </div>

        </div>

      )}

    </div>
  );
}

export default PromotionForm;