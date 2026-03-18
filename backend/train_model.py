import pandas as pd
import joblib
import matplotlib.pyplot as plt
import seaborn as sns

from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier, plot_tree
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report

# Load dataset
df = pd.read_csv("dataset/HR_comma_sep.csv")

print("\nDataset Loaded Successfully\n")

# Encode categorical columns
df["sales"] = df["sales"].astype("category").cat.codes

df["salary"] = df["salary"].map({
    "low": 0,
    "medium": 1,
    "high": 2
})

# Drop column not needed
df = df.drop("left", axis=1)

# Features
X = df.drop("promotion_last_5years", axis=1)

# Target
y = df["promotion_last_5years"]

print("Promotion Distribution:")
print(y.value_counts())

# Train test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Train improved Decision Tree
model = DecisionTreeClassifier(
    max_depth=8,
    min_samples_split=20,
    min_samples_leaf=10,
    class_weight="balanced",
    random_state=42
)

model.fit(X_train, y_train)

# Predictions
y_pred = model.predict(X_test)

# Evaluation
print("\nModel Accuracy:", accuracy_score(y_test, y_pred))

print("\nConfusion Matrix:")
print(confusion_matrix(y_test, y_pred))

print("\nClassification Report:")
print(classification_report(y_test, y_pred))

# Save model
joblib.dump(model, "model/promotion_model.pkl")

print("\nModel saved successfully!")

# ----------------------------
# Decision Tree Visualization
# ----------------------------

plt.figure(figsize=(20,10))

plot_tree(
    model,
    feature_names=X.columns,
    class_names=["Not Promoted","Promoted"],
    filled=True
)

plt.title("Decision Tree for Promotion Prediction")

plt.savefig("model/decision_tree.png")

plt.close()

print("Decision Tree image saved!")

# ----------------------------
# Feature Importance Graph
# ----------------------------

importance = model.feature_importances_

features = X.columns

plt.figure(figsize=(10,6))

sns.barplot(x=importance, y=features)

plt.title("Feature Importance for Promotion Prediction")

plt.xlabel("Importance Score")

plt.ylabel("Features")

plt.savefig("model/feature_importance.png")

plt.close()

print("Feature importance graph saved!")