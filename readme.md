# 🧪 ooz

The oidoid common library.

## Installation

ooz is a Deno TypeScript project. Add `https://deno.land/x/ooz/mod.ts` to
your import modules and reference the `https://deno.land/x/ooz/mods.json`
import map.

## Shorthands

| Shorthand | Description                                 |
| --------- | ------------------------------------------- |
| arg       | argument                                    |
| attrib    | attribute                                   |
| bin       | binary                                      |
| box       | rectangle                                   |
| cb        | callback / listener                         |
| cmd       | command                                     |
| config    | configuration                               |
| ctrl      | control                                     |
| ctx       | context                                     |
| dir       | directory                                   |
| dist      | distributable(s)                            |
| err       | error                                       |
| eq        | equal                                       |
| ev        | event                                       |
| ex        | example                                     |
| exec      | executable                                  |
| exec      | execute                                     |
| fn        | function                                    |
| int       | integer                                     |
| lhs       | left-hand side                              |
| lut       | lookup table                                |
| num       | number                                      |
| obj       | object                                      |
| op        | operation                                   |
| prev      | previous                                    |
| prop      | property                                    |
| pt        | point                                       |
| rhs       | right-hand side                             |
| size      | Map.size / Array.length                     |
| src       | source(s)                                   |
| str       | string, use shorthand except for toString() |
| sym       | symbol                                      |
| this      | this when possible, self otherwise          |
| util      | utility                                     |
| val       | value                                       |
| wh        | width and height                            |
| xy        | cartesian value pair                        |

## Environment variables

| Variable | Values       | Description   |
| -------- | ------------ | ------------- |
| V        | `1 \| unset` | Verbose mode. |

## Conventions

- Prefer TitleCase for classes, enums, and string literals.
- Favor objects to Maps. Object have wonderfully succinct syntax and native JSON
  support. Only use Maps when special keys or size tracking is needed.
- Favor `{}` objects to bare objects to keep the syntax sane.

## License

© oidoid.

### AGPL-3.0-only

This program is free software: you can redistribute it and/or modify it under
the terms of the GNU Affero General Public License as published by the Free
Software Foundation, either version 3 of the License, or (at your option) any
later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along
with this program. If not, see <https://www.gnu.org/licenses/>.

```
╭>°╮┬┌─╮╭─╮┬┌─╮
│  │││ ││ │││ │
╰──╯┴└─╯╰─╯┴└─╯
```
