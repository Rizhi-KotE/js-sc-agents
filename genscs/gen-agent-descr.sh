#!/bin/bash
read -p "sys_idtf: " sys
read -p "rus_idtf: " rus
read -p "eng_idtf: " eng
read -p "question idtf: " quest

echo "//
sc_agent_of_$sys 
<- sc_node_not_relation;
=> nrel_main_idtf:
             [$rus*] 
             (* <- lang_ru;; *);
             [$eng*]
             (* <- lang_en;;*);
=> nrel_primary_initiation_condition:
   (sc_event_add_input_arc => $quest);
<- abstract_sc_agent;
<- sc_agent_implemented_in_js;;
"
