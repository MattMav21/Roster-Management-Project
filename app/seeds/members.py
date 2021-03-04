from app.models import db, Member

# Adds a demo user, you can add other users here if you want
def seed_members():

    db.session.add(Member(name="Jeff Hardy", notes="The Charismatic Enigma", created_at="2021-03-01 14:00:00"))
    db.session.add(Member(name="Edge", notes="The Rated-R Superstar", created_at="2021-03-01 14:00:00"))

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_members():
    db.session.execute('TRUNCATE members CASCADE;')
    db.session.commit()
