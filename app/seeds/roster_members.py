from app.models import db, Roster_Member

# Adds a demo user, you can add other users here if you want
def seed_roster_members():

    db.session.add(Roster_Member(id=1, roster_id=1, member_id=1))
    db.session.add(Roster_Member(id=2, roster_id=2, member_id=2))

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_roster_members():
    db.session.execute('TRUNCATE roster_members CASCADE;')
    db.session.commit()
