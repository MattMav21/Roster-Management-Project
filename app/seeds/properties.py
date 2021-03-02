from app.models import db, Property

# Adds a demo user, you can add other users here if you want
def seed_properties():

    db.session.add(Property(id=1, name="injured", is_checked=False))
    db.session.add(Property(id=2, name="injured", is_checked=False))

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_properties():
    db.session.execute('TRUNCATE properties CASCADE;')
    db.session.commit()
