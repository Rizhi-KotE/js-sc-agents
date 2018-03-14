#!/bin/bash
read -p "sys_idtf: " sys
read -p "rus_idtf: " rus
read -p "eng_idtf: " eng
read -p "question idtf: " quest

echo "//
ui_command_of_$sys 
<- sc_node_not_relation;
=> nrel_main_idtf:
             [$rus*] 
             (* <- lang_ru;; *);
             [$eng*]
             (* <- lang_en;;*);
=> ui_nrel_command_lang_template:
   [Template of command $ui_arg_1];
<- atomic_command_class;;
"
