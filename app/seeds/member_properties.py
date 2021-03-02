from app.models import db, Member_Property

# Adds a demo user, you can add other users here if you want
def seed_member_properties():

    db.session.add(Member_Property(id=1, member_id=1, property_id=1))
    db.session.add(Member_Property(id=2, member_id=2, property_id=2))

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_member_properties():
    db.session.execute('TRUNCATE member_properties CASCADE;')
    db.session.commit()
