from .db import db

class Member(db.Model):
    __tablename__ = "members"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    notes = db.Column(db.String)
    database_roster_id = db.Column(db.Integer, db.ForeignKey("database_rosters.id"), nullable=False)
    created_at = db.Column(db.Date, nullable=False)

    db_member = db.relationship("Database_Roster", back_populates="members")
    member_rm = db.relationship("Roster_Member", back_populates="members")