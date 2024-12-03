from app import db, VulnerabilityScore
import pandas as pd

csv_path = "./data/sample_vulnerability_results.csv"

df = pd.read_csv(csv_path)

for _, row in df.iterrows():
    record = VulnerabilityScore(
        emp_id=row["emp_id"],
        department=row["department"],
        role=row["role"],
        name=row["name"],
        email=row["email"],
        vulnerability_score=row["vulnerability_score"],
    )
    db.session.add(record)

db.session.commit()
print("Data imported to AWS RDS successfully!")
