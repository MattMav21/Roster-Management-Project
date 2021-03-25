from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, SubmitField, BooleanField
from wtforms.validators import DataRequired

class PropertyAddForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired()])
    is_Checked = BooleanField("Is Checked", validators=[DataRequired()])