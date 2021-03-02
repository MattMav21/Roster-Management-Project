from .db import db

class Roster(db.Model):
    __tablename__ = "rosters"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    notes = db.Column(db.String)

    roster_rm = db.relationship("Roster_Member", back_populates="rosters")