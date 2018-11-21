# HC
Ongoing command line tool to make version control less painful and inconsistent.

## Usage

### Overview
_Angle brackets (`<>`) mean an argument is required, square brackets (`[]`) mean it's optional. Options are always optional._ 

|Command|Arguments|Options (w/aliases) |Description               | Basic Example|
|-------|---------|--------------------|--------------------------|--------------|
| tag   | `[release-number], [message]`|`--release-number -n --message -m` | Create a formatted git tag.|`hc tag`   
| tag push  | |`--remote -r` | Push the most recently created git tag.|`hc tag push`

### Commands

<dl>
  <dt><h4><code>tag</h4></code></dt>
  <dd>
    Create formatted git tags. Default tag format is <code>date.release-number.message</code>
    <br>
    <br>
    <b>Usage:</b>
    <br>
    <code>$ hc tag[release-number-today] "[message]"</code>
    <br>
    <br>
    <b>Basic Example</b>:
   
    $ hc tag 1 "Initial release"

    Created git tag: 
    2018-11-06.1.initial_release

    $
  
  <br>
    <b>Options:</b>
    <ul>
        <li><code>--release-number -n</code>: Specify what release number this is today.</li>
        <li><code>--message -m</code>: Give the tag a name and a message. HC creates annotated git tags with the same name and message. <i>Note: Be sure to wrap the message in quotes if you specify it either as an option or an argument.</i></li>
    </ul>
    <br>
    <b>Details:</b>
    <br>
    <code>tag</code> is a very flexible command. You can choose to omit or include any option or argument you'd like. If either message or release number are missing, HC can infer them. How? When the <code>--release-number</code> option is omitted, HC simply finds the latest release for the current day and increments it. If there is no release yet today, HC will start with 0. When you omit the <code>--message</code> option, HC will grab the last commit message and use it as the tag's name and message.
    <br>
    <br>
    <b>More detailed examples:</b>
    <ul>
        <li> 
          With options <code>hc tag -n 3 -m "Any option combination will do"</code>
          <br>
        </li>
        <li> With arguments <code>hc tag 2 "This is more concise but less flexible than using options"</code></li>
        <li> Or on its own <code>hc tag</code> </li>
    </ul>
    <br>
  </dd>
</dl>
