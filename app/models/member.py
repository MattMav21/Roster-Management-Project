from .db import db

class Member(db.Model):
    __tablename__ = 'members'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    notes = db.Column(db.String)
    created_at = db.Column(db.Date, nullable=False)

    roster_member = db.relationship("Roster_Member", back_populates="member")
    member_proper_t = db.relationship("Member_Property", back_populates="member")