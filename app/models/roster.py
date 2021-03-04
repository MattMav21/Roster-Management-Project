from .db import db

class Roster(db.Model):
    __tablename__ = 'rosters'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    notes = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    user = db.relationship("User", back_populates="rosters")
    roster_members = db.relationship("Roster_Member", back_populates="roster")
    