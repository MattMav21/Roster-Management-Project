from app.models import db, Roster

# Adds a demo user, you can add other users here if you want
def seed_rosters():

    db.session.add(Roster(id=1, name="Raw", notes="This is the Raw Roster", user_id=1))
    db.session.add(Roster(id=2, name="Smackdown", notes="This is the Smackdown Roster", user_id=1))

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_rosters():
    db.session.execute('TRUNCATE rosters CASCADE;')
    db.session.commit()
