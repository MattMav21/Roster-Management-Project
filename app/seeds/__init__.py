from flask.cli import AppGroup
from .users import seed_users, undo_users
from .rosters import seed_rosters, undo_rosters
from .members import seed_members, undo_members
from .roster_members import seed_roster_members, undo_roster_members
from .properties import seed_properties, undo_properties
from .member_properties import seed_member_properties, undo_member_properties

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_rosters()
    seed_members()
    seed_roster_members()
    seed_properties()
    seed_member_properties()

    # Add other seed functions here

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_member_properties()
    undo_properties()
    undo_roster_members()
    undo_members()
    undo_rosters()
    undo_users()
    # Add other undo functions here
