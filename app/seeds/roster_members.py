from app.models import db, Roster_Member, Roster, Member

# Adds a demo user, you can add other users here if you want
def seed_roster_members():

    rosters = Roster.query.all()
    members = Member.query.all()
    db.session.add(Roster_Member(roster_id=rosters[0].id, member_id=members[0].id))
    db.session.add(Roster_Member(roster_id=rosters[1].id, member_id=members[1].id))

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_roster_members():
    db.session.execute('TRUNCATE roster_members CASCADE;')
    db.session.commit()
