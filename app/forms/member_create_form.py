from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, SubmitField
from wtforms.validators import DataRequired

class MemberCreateForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired()])
    notes = TextAreaField("Notes")