from app.models import db, Member_Property, Member, Property

# Adds a demo user, you can add other users here if you want
def seed_member_properties():

    members = Member.query.all()
    properties = Property.query.all()

    db.session.add(Member_Property(member_id=members[0].id, property_id=properties[0].id))
    db.session.add(Member_Property(member_id=members[1].id, property_id=properties[1].id))

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_member_properties():
    db.session.execute('TRUNCATE member_properties CASCADE;')
    db.session.commit()
