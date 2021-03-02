from .db import db

class Roster_Member(db.Model):
    __tablename__ = 'roster_members'
    id = db.Column(db.Integer, primary_key=True)
    roster_id = db.Column(db.Integer, db.ForeignKey("rosters.id"), nullable=False)
    member_id = db.Column(db.Integer, db.ForeignKey("members.id"), nullable=False)

    rosters = db.relationship("Roster", back_populates="roster_members")
    member = db.relationship("Member", back_populates="roster_member")