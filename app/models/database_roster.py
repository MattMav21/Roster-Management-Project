from .db import db

class Database_Roster(db.Model):
    __tablename__ = "database_rosters"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    user_db = db.relationship("User", back_populates="database_rosters")
    db_member = db.relationship("Member", back_populates="database_rosters")