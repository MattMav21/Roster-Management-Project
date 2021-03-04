from app.models import db, Roster, User

# Adds a demo user, you can add other users here if you want
def seed_rosters():
    user = User.query.first()

    db.session.add(Roster(name="Raw", notes="This is the Raw Roster", user_id=user.id))
    db.session.add(Roster(name="Smackdown", notes="This is the Smackdown Roster", user_id=user.id))

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_rosters():
    db.session.execute('TRUNCATE rosters CASCADE;')
    db.session.commit()
