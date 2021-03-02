from .db import db

class Property(db.Model):
    __tablename__ = 'properties'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    is_checked = db.Column(db.Boolean, nullable=False)

    member_proper_t = db.relationship("Member_Property", back_populates="proper_t")