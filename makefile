include ./config.make
include ./rules.make

codegen_out_box_files := \
  $(src_dir)/2d/box/num-box.ts \
  $(src_dir)/2d/box/unum-box.ts \
  $(src_dir)/2d/box/i4-box.ts \
  $(src_dir)/2d/box/u4-box.ts \
  $(src_dir)/2d/box/i8-box.ts \
  $(src_dir)/2d/box/u8-box.ts \
  $(src_dir)/2d/box/i16-box.ts \
  $(src_dir)/2d/box/u16-box.ts \
  $(src_dir)/2d/box/i32-box.ts \
  $(src_dir)/2d/box/u32-box.ts \
  $(src_dir)/2d/box/int-box.ts \
  $(src_dir)/2d/box/uint-box.ts
codegen_out_xy_files := \
  $(src_dir)/2d/xy/num-xy.ts \
  $(src_dir)/2d/xy/unum-xy.ts \
  $(src_dir)/2d/xy/i4-xy.ts \
  $(src_dir)/2d/xy/u4-xy.ts \
  $(src_dir)/2d/xy/i8-xy.ts \
  $(src_dir)/2d/xy/u8-xy.ts \
  $(src_dir)/2d/xy/i16-xy.ts \
  $(src_dir)/2d/xy/u16-xy.ts \
  $(src_dir)/2d/xy/i32-xy.ts \
  $(src_dir)/2d/xy/u32-xy.ts \
  $(src_dir)/2d/xy/int-xy.ts \
  $(src_dir)/2d/xy/uint-xy.ts
codegen_out_files := $(codegen_out_box_files) $(codegen_out_xy_files)

bundle: codegen
watch-bundle: codegen

.PHONY: codegen
codegen: ${codegen_out_files}

$(codegen_out_box_files)&: $(src_dir)/2d/box/box.ejs
  bin/ejs '$^' '{"coercions": ["Clamp"                          ], "component": "number", "type": "Num" }' >| $(src_dir)/2d/box/num-box.ts
  bin/ejs '$^' '{"coercions": ["Clamp"                          ], "component": "Unum",   "type": "Unum"}' >| $(src_dir)/2d/box/unum-box.ts
  bin/ejs '$^' '{"coercions": ["Ceil", "Clamp", "Floor", "Round"], "component": "I4",     "type": "I4"  }' >| $(src_dir)/2d/box/i4-box.ts
  bin/ejs '$^' '{"coercions": ["Ceil", "Clamp", "Floor", "Round"], "component": "U4",     "type": "U4"  }' >| $(src_dir)/2d/box/u4-box.ts
  bin/ejs '$^' '{"coercions": ["Ceil", "Clamp", "Floor", "Round"], "component": "I8",     "type": "I8"  }' >| $(src_dir)/2d/box/i8-box.ts
  bin/ejs '$^' '{"coercions": ["Ceil", "Clamp", "Floor", "Round"], "component": "U8",     "type": "U8"  }' >| $(src_dir)/2d/box/u8-box.ts
  bin/ejs '$^' '{"coercions": ["Ceil", "Clamp", "Floor", "Round"], "component": "I16",    "type": "I16" }' >| $(src_dir)/2d/box/i16-box.ts
  bin/ejs '$^' '{"coercions": ["Ceil", "Clamp", "Floor", "Round"], "component": "U16",    "type": "U16" }' >| $(src_dir)/2d/box/u16-box.ts
  bin/ejs '$^' '{"coercions": ["Ceil", "Clamp", "Floor", "Round"], "component": "I32",    "type": "I32" }' >| $(src_dir)/2d/box/i32-box.ts
  bin/ejs '$^' '{"coercions": ["Ceil", "Clamp", "Floor", "Round"], "component": "U32",    "type": "U32" }' >| $(src_dir)/2d/box/u32-box.ts
  bin/ejs '$^' '{"coercions": ["Ceil", "Clamp", "Floor", "Round"], "component": "Int",    "type": "Int" }' >| $(src_dir)/2d/box/int-box.ts
  bin/ejs '$^' '{"coercions": ["Ceil", "Clamp", "Floor", "Round"], "component": "Uint",   "type": "Uint"}' >| $(src_dir)/2d/box/uint-box.ts

$(codegen_out_xy_files)&: $(src_dir)/2d/xy/xy.ejs
  bin/ejs '$^' '{"coercions": ["Clamp"                          ], "component": "number", "type": "Num" }' >| $(src_dir)/2d/xy/num-xy.ts
  bin/ejs '$^' '{"coercions": ["Clamp"                          ], "component": "Unum",   "type": "Unum"}' >| $(src_dir)/2d/xy/unum-xy.ts
  bin/ejs '$^' '{"coercions": ["Ceil", "Clamp", "Floor", "Round"], "component": "I4",     "type": "I4"  }' >| $(src_dir)/2d/xy/i4-xy.ts
  bin/ejs '$^' '{"coercions": ["Ceil", "Clamp", "Floor", "Round"], "component": "U4",     "type": "U4"  }' >| $(src_dir)/2d/xy/u4-xy.ts
  bin/ejs '$^' '{"coercions": ["Ceil", "Clamp", "Floor", "Round"], "component": "I8",     "type": "I8"  }' >| $(src_dir)/2d/xy/i8-xy.ts
  bin/ejs '$^' '{"coercions": ["Ceil", "Clamp", "Floor", "Round"], "component": "U8",     "type": "U8"  }' >| $(src_dir)/2d/xy/u8-xy.ts
  bin/ejs '$^' '{"coercions": ["Ceil", "Clamp", "Floor", "Round"], "component": "I16",    "type": "I16" }' >| $(src_dir)/2d/xy/i16-xy.ts
  bin/ejs '$^' '{"coercions": ["Ceil", "Clamp", "Floor", "Round"], "component": "U16",    "type": "U16" }' >| $(src_dir)/2d/xy/u16-xy.ts
  bin/ejs '$^' '{"coercions": ["Ceil", "Clamp", "Floor", "Round"], "component": "I32",    "type": "I32" }' >| $(src_dir)/2d/xy/i32-xy.ts
  bin/ejs '$^' '{"coercions": ["Ceil", "Clamp", "Floor", "Round"], "component": "U32",    "type": "U32" }' >| $(src_dir)/2d/xy/u32-xy.ts
  bin/ejs '$^' '{"coercions": ["Ceil", "Clamp", "Floor", "Round"], "component": "Int",    "type": "Int" }' >| $(src_dir)/2d/xy/int-xy.ts
  bin/ejs '$^' '{"coercions": ["Ceil", "Clamp", "Floor", "Round"], "component": "Uint",   "type": "Uint"}' >| $(src_dir)/2d/xy/uint-xy.ts

clean: clean-codegen

.PHONY: clean-codegen
clean-codegen:; $(rm) $(codegen_out_files)
