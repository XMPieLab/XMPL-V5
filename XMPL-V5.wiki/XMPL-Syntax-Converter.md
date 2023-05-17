>### XMPL V5

To convert XMPL V3 to XMPL V5 syntax in web pages, use the [Syntax Converter](https://ajax.xmcircle.com/ajax/libs/XMPL-V5/SyntaxConverter.zip).

## Prerequisite
As a prerequisite, install NodeJS version 12 or later. 
If you don't have NodeJS, visit [https://nodejs.org/](https://nodejs.org/), download and install it.

Note: Files and folder paths mustn't contain spaces. 

## Changes made by the Syntax Converter

The Syntax Converter makes the following changes to the HTML page:

1. Changes the text ADORs by adding a new `xmp-text` directive.

    Before conversion:
    `<p>{{xmp.r['FirstName']}}</p>`

    After conversion:
    `<p><span xmp-text="{{xmp.r['FirstName']}}"></span></p>`

2. Changes the XMPL library to the new version.
3. Adds comments as to which attributes are not yet supported.
4. Moves the link to xmpcfg.js up to the library link. 

## How to use the Syntax Converter
To convert XMPL V3 syntax to XMPL V5 syntax in existing websites:
1. Create a folder and place in it the migrate.js file.
2. Install dependencies from the **package.json** file.
   To do so, use the `npm install` command.
3. Choose the file or folder that you want to convert, and copy its path. **Note! The files and folder path mustn't contain spaces.**
4. On the command line, where the migrate.js file is located, type:  
 `node convert.js --input [[Path to file/folder that you want to convert to the new version]] --output [[Path to the folder where the new files will be located]]`.
5. When the conversion is complete, the output folder will contain files with the new syntax. 
6. In this folder a **log.txt** file is created containing information about the files that were converted. Example of a log file:
````html
D:\{{path to the file}}\page.html
<!-- ==========================================================
xmp-repeat
xmp-text-asset
not yet supported in version 5.0
* ==========================================================  -->
````
The log file stores information about attributes that are not yet supported, which appear as comments.

````html
<tbody>
<!--xmp-repeat not yet supported in version 5.0-->
  <tr xmp-repeat="item in xmp.r['Table']">
	<td>{{item['FirstName']}}</td>
	<td>{{item['LastName']}}</td>
	<td>{{item['Gender']}}</td>
  </tr>
</tbody>
````
**Notes:**
* Check what script to include in the head. You can find more information [here](https://github.com/XMPieLab/XMPL-V5/wiki/Cheat-Sheet-for-Web-%28V5%29).
* The Syntax Converter does not delete unneeded code.

## Tutorial 
[Here is a tutorial video](https://campus.xmpie.com/Tutorial/XMPL-NG-Migration-Tool) that demonstrates the use of the Syntax Converter.