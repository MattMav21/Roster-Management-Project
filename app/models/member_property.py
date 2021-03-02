from .db import db

class Member_Property(db.Model):
    __tablename__ = 'member_properties'
    id = db.Column(db.Integer, primary_key=True)
    member_id = db.Column(db.Integer, db.ForeignKey("members.id"), nullable=False)
    property_id = db.Column(db.Integer, db.ForeignKey("properties.id"), nullable=False)

    member = db.relationship("Member", back_populates="member_proper_t")
    proper_t = db.relationship("Property", back_populates="member_proper_t")