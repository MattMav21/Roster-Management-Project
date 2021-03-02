from .db import db

class Roster_Member(db.Model):
    __tablename__ = "roster_members"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    rosterId = db.Column(db.Integer, db.ForeignKey("rosters.id"))
    memberId = db.Column(db.Integer, db.ForeignKey("members.id"), nullable=False)

    member_rm = db.relationship("Member", back_populates="roster_members")
    roster_rm = db.relationship("Roster", back_populates="roster_members")