[repo location](https://github.com/jurijsk/www-kab)


# Tools

```
npx @modelcontextprotocol/inspector
```

# Prompts 

### Get variables from Figma

```
Get variables from Figma using the figma mcp and the get_variable_defs tool to define CSS variables (custom properties) in main.css. Use '0:1' for nodeid. Store everything in main.css.

Ignore all variables containing "| tech". Those variables are used for annotations inside Figma and are only needed inside Figma at design-time.

Keep the names of the variables unchanged when you define them in CSS, except for replacing '-' with '_'. This is nonconventional naming, but it does make double-click selection of text in the editor easier. Example: if the name in Figma is 'decorative-lines-inverted' the resulting CSS variable should be '--decorative_lines_inverted'.

There are 2 kinds of variable kinds declared in Figma: base and semantic. 

Base variables are only used to set values for semantic variables and are. Base variable names always start with the '----' prefix. Define those variables in the block surrounded by the comment stating that those variables are "BASE" and then should not be used directly in CSS rules, but only to define other variables. When defining a base variable, do not add an additional '--'  front. For example, Figma variable name '----base-variable' will become '----base_variable'.

Do not add any new base variable if the are not in raw data from Fimga, just define semantic variable with constant value as is.

Semantic variables, the variables without the '----' prefix, are defined via base variables (variables with the '----' prefix). When you see a semantic variable, find the corresponding base variable by value to define it as such --semnatic_variable: var(----base_variable);

Do not use raw values of the variables as `declaration-value` (fallback values).

Use proper CSS syntax for `font` property. Consult MDN mcp or website to documentation if necessary. 

Order variables by base and semantic first and then by type, colors, sizes, fonts. 

Define base size as 18px at the :root level.

Assume that integer values without units are defined in `px`. 

Convert integer values and 'px' values to `rem`. Round rem values to single decimal even value. For example, 18px = 1rem, and 24px = 1.4rem.

Do not add comments with original values; no one will check your math afterward. (But I will check it right away).
```

