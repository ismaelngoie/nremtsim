export type Level = "EMT" | "Paramedic";

export type Question = {
  id: number;
  level: Level;
  category: string;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export const questions: Question[] = [
  // ================= EMT CATEGORIES =================
  // 1. Patient Treatment
  {
    id: 1, level: "EMT", category: "Patient Treatment",
    text: "A 58-year-old with crushing chest pain is alert, not allergic, and has no signs of bleeding. The best initial medication is:",
    options: ["Aspirin (chewed), if allowed by protocol", "Oral glucose gel", "Epinephrine auto-injector", "Nitroglycerin regardless of BP"],
    correctIndex: 0,
    explanation: "Aspirin reduces platelet aggregation in suspected ACS; give if no contraindication and per protocol."
  },
  {
    id: 2, level: "EMT", category: "Patient Treatment",
    text: "A 46-year-old took sildenafil 2 hours ago and now has chest pain. He has nitroglycerin prescribed. You should:",
    options: ["Give nitroglycerin only if pain is 10/10", "Withhold nitroglycerin and contact medical control", "Assist with nitroglycerin immediately", "Give nitroglycerin if HR is above 60"],
    correctIndex: 1,
    explanation: "PDE-5 inhibitors plus nitro can cause dangerous hypotension; follow protocol/medical control."
  },
  {
    id: 3, level: "EMT", category: "Patient Treatment",
    text: "A patient is wheezing with a history of asthma and has a prescribed MDI. After oxygen, you should:",
    options: ["Apply a traction splint", "Give activated charcoal", "Assist with the patient's prescribed inhaler", "Place the patient in Trendelenburg"],
    correctIndex: 2,
    explanation: "An MDI bronchodilator can relieve bronchospasm when prescribed and the patient can use it."
  },
  {
    id: 4, level: "EMT", category: "Patient Treatment",
    text: "A 6-year-old has hives, wheezing, and lip swelling after peanut exposure. The priority treatment is:",
    options: ["Delay care until rash resolves", "Give aspirin", "Assist with an epinephrine auto-injector, if available/prescribed", "Give oral glucose"],
    correctIndex: 2,
    explanation: "Anaphylaxis threatens airway and breathing; epinephrine is first-line per protocol."
  },
  {
    id: 5, level: "EMT", category: "Patient Treatment",
    text: "A diabetic patient is awake but confused with cool, clammy skin. BGL is 48 mg/dL. You should:",
    options: ["Give water only", "Administer oral glucose if they can swallow", "Force food despite inability to swallow", "Delay treatment until at the hospital"],
    correctIndex: 1,
    explanation: "Symptomatic hypoglycemia needs rapid glucose; only give orally if the gag reflex and swallowing are intact."
  },
  {
    id: 6, level: "EMT", category: "Patient Treatment",
    text: "A suspected opioid overdose patient has slow, shallow respirations (6/min) and pinpoint pupils. First priority is:",
    options: ["Ventilate with a BVM and oxygen", "Give aspirin", "Induce vomiting", "Give oral glucose"],
    correctIndex: 0,
    explanation: "Airway and ventilation come first; naloxone is adjunct after you support breathing."
  },
  {
    id: 7, level: "EMT", category: "Patient Treatment",
    text: "After BVM ventilation, you administer naloxone for a suspected opioid overdose. The patient becomes agitated. Next, you should:",
    options: ["Reassess airway/breathing and be prepared for vomiting", "Let the patient walk around", "Remove oxygen to calm them", "Give another full dose immediately"],
    correctIndex: 0,
    explanation: "Naloxone can cause sudden withdrawal and vomiting; protect airway and reassess ventilation."
  },
  {
    id: 8, level: "EMT", category: "Patient Treatment",
    text: "A patient has heavy external bleeding from the forearm. Direct pressure fails. Next step is:",
    options: ["Massage the bleeding site", "Apply a tourniquet proximal to the bleeding", "Apply heat to the wound", "Elevate only and wait"],
    correctIndex: 1,
    explanation: "For life-threatening extremity bleeding not controlled by pressure, use a tourniquet."
  },
  {
    id: 9, level: "EMT", category: "Patient Treatment",
    text: "A closed femur fracture is suspected with deformity and severe pain. You should:",
    options: ["Delay splinting until hospital", "Encourage the patient to walk", "Immobilize the limb and consider a traction splint per protocol", "Push the bone back in"],
    correctIndex: 2,
    explanation: "Immobilization limits bleeding/pain; traction splints can reduce femur fracture complications when indicated."
  },
  {
    id: 10, level: "EMT", category: "Patient Treatment",
    text: "A patient with burns has clothing stuck to the skin. You should:",
    options: ["Apply butter/ointment", "Peel the clothing off", "Cut around the stuck clothing and cover burns with dry sterile dressing", "Break large blisters"],
    correctIndex: 2,
    explanation: "Remove loose clothing/jewelry, but don't pull adhered material; cover with dry sterile dressings."
  },
  {
    id: 11, level: "EMT", category: "Patient Treatment",
    text: "A patient is in shock (cool, pale, tachycardic) after trauma. Best EMT treatment is:",
    options: ["Control bleeding, keep warm, and transport rapidly", "Give large amounts of water", "Apply ice packs to the torso", "Delay transport for a full history"],
    correctIndex: 0,
    explanation: "EMTs treat shock by stopping bleeding, preventing heat loss, and minimizing scene time."
  },
  {
    id: 12, level: "EMT", category: "Patient Treatment",
    text: "A patient is having an active generalized seizure. Your best action is to:",
    options: ["Insert a tongue depressor", "Protect from injury and maintain airway after seizure stops", "Restrain the patient's arms", "Give oral fluids"],
    correctIndex: 1,
    explanation: "Do not put anything in the mouth or restrain; focus on safety and airway/oxygenation."
  },
  {
    id: 13, level: "EMT", category: "Patient Treatment",
    text: "A heat stroke patient is hot, altered, and has dry skin. Most appropriate action is:",
    options: ["Delay cooling until ED", "Give a warm blanket and wait", "Encourage jogging to sweat", "Begin rapid cooling and transport"],
    correctIndex: 3,
    explanation: "Heat stroke is life-threatening; aggressive cooling and rapid transport are critical."
  },
  {
    id: 14, level: "EMT", category: "Patient Treatment",
    text: "A hypothermic patient is bradycardic and shivering. You should:",
    options: ["Allow walking to generate heat", "Rub the extremities vigorously", "Handle gently and prevent further heat loss", "Give alcohol to warm them"],
    correctIndex: 2,
    explanation: "Rough handling can trigger dysrhythmias; focus on insulation and gentle care."
  },
  {
    id: 15, level: "EMT", category: "Patient Treatment",
    text: "A patient is vomiting and has trouble handling secretions. The best airway tool is:",
    options: ["Nebulized albuterol", "Suction", "Traction splint", "Oropharyngeal airway only"],
    correctIndex: 1,
    explanation: "Suction clears fluids to maintain airway patency; use before adjuncts when needed."
  },
  {
    id: 16, level: "EMT", category: "Patient Treatment",
    text: "An adult choking victim cannot speak or cough. Appropriate treatment is:",
    options: ["Give water to wash it down", "Abdominal thrusts until obstruction clears or they become unresponsive", "Place in recovery position and wait", "Back blows only"],
    correctIndex: 1,
    explanation: "For conscious adults with severe airway obstruction, use abdominal thrusts."
  },
  {
    id: 17, level: "EMT", category: "Patient Treatment",
    text: "An infant is choking and cannot cry. You should:",
    options: ["Use abdominal thrusts", "Give rescue breaths only", "Give back slaps and chest thrusts", "Do a blind finger sweep"],
    correctIndex: 2,
    explanation: "Infants are treated with back slaps and chest thrusts; avoid abdominal thrusts and blind sweeps."
  },
  {
    id: 18, level: "EMT", category: "Patient Treatment",
    text: "A patient with suspected stroke has symptom onset 45 minutes ago. Your priority is to:",
    options: ["Rapidly transport and note last known well time", "Give nitroglycerin", "Treat with oral glucose without checking BGL", "Delay transport for a long interview"],
    correctIndex: 0,
    explanation: "Stroke care is time-dependent; document last known well and transport to an appropriate facility."
  },
  {
    id: 19, level: "EMT", category: "Patient Treatment",
    text: "A patient has epistaxis (nosebleed) without trauma. Best care is:",
    options: ["Pinch the nostrils and lean the patient forward", "Apply a tourniquet", "Pack the nose deeply with gauze", "Lean the patient back"],
    correctIndex: 0,
    explanation: "Leaning forward prevents blood from entering the airway and stomach; apply direct pressure to the nostrils."
  },
  {
    id: 20, level: "EMT", category: "Patient Treatment",
    text: "A patient with suspected spinal injury is vomiting. Best position is:",
    options: ["Remove the cervical collar", "Sit them upright without support", "Leave them supine and wait", "Log roll as a unit to clear the airway while maintaining spinal alignment"],
    correctIndex: 3,
    explanation: "Airway is priority; log roll maintains spinal precautions while clearing vomit."
  },
  {
    id: 21, level: "EMT", category: "Patient Treatment",
    text: "A COPD patient is in moderate distress with SpO2 86%. Best oxygen approach is:",
    options: ["Withhold oxygen to avoid hypoventilation", "Titrate oxygen to improve oxygenation (aim per protocol)", "Give only room air", "Give 100% oxygen and do not reassess"],
    correctIndex: 1,
    explanation: "COPD patients need oxygen; titrate and reassess while monitoring mental status and ventilation."
  },
  {
    id: 22, level: "EMT", category: "Patient Treatment",
    text: "A child with croup has a barking cough and stridor. Best EMT care is:",
    options: ["Keep the child calm and provide humidified oxygen if available", "Give aspirin", "Inspect the throat with a tongue blade", "Force the child to lie flat"],
    correctIndex: 0,
    explanation: "Agitation can worsen upper-airway obstruction; avoid upsetting the child."
  },
  {
    id: 23, level: "EMT", category: "Patient Treatment",
    text: "A suspected poisoning patient is awake and alert. The first step is to:",
    options: ["Give alcohol to dilute it", "Delay care until symptoms appear", "Identify the substance and contact poison control/medical direction", "Give ipecac to induce vomiting"],
    correctIndex: 2,
    explanation: "Management depends on the toxin; get information and follow medical direction."
  },
  {
    id: 24, level: "EMT", category: "Patient Treatment",
    text: "A patient with a penetrating object in the abdomen should have it:",
    options: ["Removed immediately", "Stabilized in place with bulky dressings", "Pushed deeper to stop bleeding", "Ignored during transport"],
    correctIndex: 1,
    explanation: "Do not remove impaled objects; stabilize to prevent movement and bleeding."
  },
  {
    id: 25, level: "EMT", category: "Patient Treatment",
    text: "A patient has an open chest wound with sucking sound. You should:",
    options: ["Pack with gauze tightly", "Leave it open to 'let air out'", "Apply an occlusive dressing secured on three sides if taught by protocol", "Apply a tourniquet around the chest"],
    correctIndex: 2,
    explanation: "An occlusive dressing limits air entry; a flutter valve concept helps reduce tension physiology."
  },
  {
    id: 26, level: "EMT", category: "Patient Treatment",
    text: "A suspected spinal injury patient is found seated in a vehicle and stable. You should:",
    options: ["Maintain manual stabilization and follow local extrication/spinal motion restriction protocol", "Let them self-extricate without assessment", "Pull them out quickly by the arms", "Remove helmet and ignore c-spine"],
    correctIndex: 0,
    explanation: "Limit spinal movement during extrication; use appropriate technique and resources."
  },
  {
    id: 27, level: "EMT", category: "Patient Treatment",
    text: "A patient complains of allergic reaction but only has localized itching and no breathing issues. You should:",
    options: ["Monitor, provide supportive care, and be ready to treat worsening symptoms", "Withhold oxygen regardless of status", "Give epinephrine immediately in all cases", "Force oral fluids"],
    correctIndex: 0,
    explanation: "Not all allergic reactions are anaphylaxis; watch for airway/breathing compromise."
  },
  {
    id: 28, level: "EMT", category: "Patient Treatment",
    text: "A patient with abdominal pain is found in the fetal position, guarding. Best EMT treatment is:",
    options: ["Give food to settle the stomach", "Position of comfort and transport with ongoing reassessment", "Delay transport until pain stops", "Apply heat directly to abdomen"],
    correctIndex: 1,
    explanation: "Supportive care and rapid evaluation are key; avoid oral intake and repeated reassessments."
  },
  {
    id: 29, level: "EMT", category: "Patient Treatment",
    text: "A patient with severe shortness of breath and pink frothy sputum is conscious. Best immediate EMT intervention is:",
    options: ["Place supine with legs elevated", "Apply CPAP if available and not contraindicated", "Encourage rapid deep breaths without support", "Give oral glucose"],
    correctIndex: 1,
    explanation: "CPAP improves oxygenation in pulmonary edema when the patient can tolerate it and protocols allow."
  },
  {
    id: 30, level: "EMT", category: "Patient Treatment",
    text: "A patient has a partial-thickness burn to the forearm. After cooling briefly, you should:",
    options: ["Cover with a dry sterile dressing and prevent hypothermia", "Apply petroleum jelly", "Apply ice directly for 30 minutes", "Pop blisters to relieve pressure"],
    correctIndex: 0,
    explanation: "Cover burns to reduce contamination and pain; avoid ice and breaking blisters."
  },

  // 2. Primary Assessment
  {
    id: 31, level: "EMT", category: "Primary Assessment",
    text: "You arrive to a patient lying on the ground. The first step of the primary assessment is to:",
    options: ["Ask bystanders what happened", "Take a full set of vitals", "Assess scene safety and apply PPE", "Start a head-to-toe exam"],
    correctIndex: 2,
    explanation: "Scene safety/BSI come first before patient contact."
  },
  {
    id: 32, level: "EMT", category: "Primary Assessment",
    text: "An unresponsive adult has no normal breathing. Next action is to:",
    options: ["Give oral glucose", "Place in recovery position immediately", "Take a blood pressure", "Check pulse and begin CPR if pulseless (and use AED)"],
    correctIndex: 3,
    explanation: "For suspected cardiac arrest, assess breathing/pulse quickly and start CPR/AED."
  },
  {
    id: 33, level: "EMT", category: "Primary Assessment",
    text: "A trauma patient has massive leg bleeding. In the primary assessment you should first:",
    options: ["Get a full medical history", "Control the hemorrhage", "Assess pupils", "Palpate the abdomen first"],
    correctIndex: 1,
    explanation: "Life-threatening bleeding is treated immediately, even before other steps."
  },
  {
    id: 34, level: "EMT", category: "Primary Assessment",
    text: "A patient responds only to painful stimuli. This is documented as:",
    options: ["Unresponsive", "P on AVPU", "V on AVPU", "Alert"],
    correctIndex: 1,
    explanation: "AVPU: Alert, responds to Verbal, responds to Pain, Unresponsive."
  },
  {
    id: 35, level: "EMT", category: "Primary Assessment",
    text: "A patient with snoring respirations likely needs:",
    options: ["Airway repositioning and an airway adjunct if appropriate", "Oral glucose", "A tourniquet to the neck", "A traction splint"],
    correctIndex: 0,
    explanation: "Snoring suggests partial obstruction by the tongue; open the airway."
  },
  {
    id: 36, level: "EMT", category: "Primary Assessment",
    text: "You suspect a cervical spine injury. The preferred manual airway maneuver is:",
    options: ["Jaw-thrust (without head tilt)", "Hyperextend the neck", "Head-tilt chin-lift", "Sit the patient forward"],
    correctIndex: 0,
    explanation: "Jaw-thrust opens the airway while minimizing neck movement."
  },
  {
    id: 37, level: "EMT", category: "Primary Assessment",
    text: "A patient is breathing 8/min with shallow chest rise. Best immediate intervention is:",
    options: ["Give a bronchodilator inhaler", "Offer water", "Assist ventilations with a BVM and oxygen", "Apply a hot pack"],
    correctIndex: 2,
    explanation: "Inadequate ventilation requires assisted breaths, not just oxygen."
  },
  {
    id: 38, level: "EMT", category: "Primary Assessment",
    text: "A patient has absent radial pulses and cool, clammy skin. This most strongly suggests:",
    options: ["Hyperventilation syndrome", "Shock/poor perfusion", "Hypertension", "Normal perfusion"],
    correctIndex: 1,
    explanation: "Weak/absent peripheral pulses with cool skin indicates inadequate perfusion."
  },
  {
    id: 39, level: "EMT", category: "Primary Assessment",
    text: "During primary assessment, the 'C' in ABCs refers to:",
    options: ["Consciousness only", "Capnography", "Circulation (pulse, perfusion, major bleeding)", "Cervical collar"],
    correctIndex: 2,
    explanation: "Circulation includes pulse quality, skin signs, and bleeding control."
  },
  {
    id: 40, level: "EMT", category: "Primary Assessment",
    text: "A responsive adult refuses assessment. Before leaving, you must first:",
    options: ["Leave immediately without documentation", "Assess decision-making capacity and explain risks/benefits", "Call law enforcement to force care", "Take the refusal as valid without questions"],
    correctIndex: 1,
    explanation: "A valid refusal requires capacity, informed decision, and documentation."
  },
  {
    id: 41, level: "EMT", category: "Primary Assessment",
    text: "A patient is talking in full sentences but has labored breathing and retractions. This indicates:",
    options: ["Only anxiety", "Normal breathing", "Immediate cardiac arrest", "Increased work of breathing (potential respiratory distress)"],
    correctIndex: 3,
    explanation: "Full sentences suggest good air exchange, but retractions/labored breathing are concerning."
  },
  {
    id: 42, level: "EMT", category: "Primary Assessment",
    text: "In a patient with suspected stroke, the primary assessment priority is:",
    options: ["Give nitroglycerin", "Airway, breathing, and rapid transport (time sensitive)", "Delay transport to complete detailed neuro exam", "Administer antibiotics"],
    correctIndex: 1,
    explanation: "Stroke is time-dependent; stabilize ABCs and transport quickly."
  },
  {
    id: 43, level: "EMT", category: "Primary Assessment",
    text: "A child is lethargic with poor muscle tone. This is considered:",
    options: ["Only a sleep issue", "An abnormal mental status requiring urgent evaluation", "Normal for toddlers", "A sign to delay transport"],
    correctIndex: 1,
    explanation: "Lethargy in pediatrics is concerning and can indicate hypoxia or shock."
  },
  {
    id: 44, level: "EMT", category: "Primary Assessment",
    text: "A patient has noisy high-pitched inspiratory sounds. This is most consistent with:",
    options: ["Stridor (upper airway obstruction)", "Rales (fluid)", "Wheezing (lower airway)", "Rhales"],
    correctIndex: 0,
    explanation: "Stridor is an upper-airway sound and is an emergency."
  },
  {
    id: 45, level: "EMT", category: "Primary Assessment",
    text: "A patient's skin is hot and dry with tachycardia and altered mental status. You should suspect:",
    options: ["Mild hypothermia", "Stable dehydration only", "Heat stroke and treat as a life threat", "Normal thermoregulation"],
    correctIndex: 2,
    explanation: "Hot/dry with AMS suggests failure to cool; rapid cooling and transport."
  },
  {
    id: 46, level: "EMT", category: "Primary Assessment",
    text: "A patient has an open airway but is cyanotic with SpO2 78%. The immediate action is to:",
    options: ["Apply ice packs", "Provide high-concentration oxygen and support ventilation as needed", "Delay oxygen until blood pressure is taken", "Give oral glucose"],
    correctIndex: 1,
    explanation: "Severe hypoxia needs oxygen/ventilation support immediately."
  },
  {
    id: 47, level: "EMT", category: "Primary Assessment",
    text: "A trauma patient is alert but has rapid breathing and anxiety. You should first check:",
    options: ["Their food allergies first", "Breathing adequacy and chest rise (not just rate)", "The patient's credit card", "Full abdominal history"],
    correctIndex: 1,
    explanation: "Rate alone can be misleading; assess depth, effort, and symmetry."
  },
  {
    id: 48, level: "EMT", category: "Primary Assessment",
    text: "An adult has a pulse but is unresponsive with vomit in the mouth. First action is to:",
    options: ["Give aspirin", "Ask OPQRST questions", "Suction and position to protect the airway", "Start a traction splint"],
    correctIndex: 2,
    explanation: "Airway clearing is priority to prevent aspiration."
  },
  {
    id: 49, level: "EMT", category: "Primary Assessment",
    text: "During a primary assessment, a patient with absent breath sounds on one side after trauma suggests:",
    options: ["A sprained ankle", "A normal finding", "Only a mild cough", "A serious chest injury requiring rapid transport and ALS"],
    correctIndex: 3,
    explanation: "Unilateral absent sounds after trauma can indicate pneumothorax/hemothorax."
  },
  {
    id: 50, level: "EMT", category: "Primary Assessment",
    text: "In the primary assessment, you find a patient with severe respiratory distress and altered mental status. This patient is:",
    options: ["Not transportable", "High priority for rapid transport", "Stable because they are talking", "Low priority because they are awake"],
    correctIndex: 1,
    explanation: "Respiratory failure signs require rapid transport/ALS."
  },
  {
    id: 51, level: "EMT", category: "Primary Assessment",
    text: "A patient’s respirations are fast and deep after exertion, and they can speak normally. This is most consistent with:",
    options: ["Apnea", "Hyperventilation from exertion/anxiety (still assess for other causes)", "Cardiac arrest", "Complete airway obstruction"],
    correctIndex: 1,
    explanation: "Speaking normally suggests airway is open; still evaluate for medical causes."
  },
  {
    id: 52, level: "EMT", category: "Primary Assessment",
    text: "In a trauma patient, the purpose of spinal motion restriction is to:",
    options: ["Treat pain directly", "Minimize movement in patients at risk of spine injury", "Stop internal bleeding", "Replace oxygen therapy"],
    correctIndex: 1,
    explanation: "Spinal motion restriction reduces movement, not a treatment for bleeding/pain."
  },
  {
    id: 53, level: "EMT", category: "Primary Assessment",
    text: "A patient with suspected opioid overdose is breathing 4/min and has a pulse. Priority is:",
    options: ["Wait for police", "Give aspirin", "Ventilations with BVM and oxygen", "Give naloxone first without ventilating"],
    correctIndex: 2,
    explanation: "Oxygenation/ventilation is the immediate lifesaving intervention."
  },
  {
    id: 54, level: "EMT", category: "Primary Assessment",
    text: "A patient's airway is clear, breathing is adequate, but they have uncontrolled arterial bleeding. You should:",
    options: ["Take a temperature", "Control the bleeding immediately", "Apply oxygen and ignore bleeding", "Start a full head-to-toe exam"],
    correctIndex: 1,
    explanation: "Hemorrhage can rapidly cause shock; control it immediately."
  },
  {
    id: 55, level: "EMT", category: "Primary Assessment",
    text: "A patient is found hanging and has weak pulse and agonal respirations. Next step is to:",
    options: ["Begin ventilations and follow resuscitation protocol (and request ALS)", "Assume death and do nothing", "Delay care for police report", "Give oral glucose"],
    correctIndex: 0,
    explanation: "Agonal respirations are ineffective; support airway/ventilations promptly."
  },
  {
    id: 56, level: "EMT", category: "Primary Assessment",
    text: "A patient is pale and diaphoretic with chest pain. In primary assessment, the most concerning finding is:",
    options: ["A mild headache", "Normal skin color", "Altered mental status or hypotension", "Pain only"],
    correctIndex: 2,
    explanation: "Signs of poor perfusion (AMS, hypotension) indicate instability."
  },
  {
    id: 57, level: "EMT", category: "Primary Assessment",
    text: "When assessing breathing, the best method is to:",
    options: ["Assess bowel sounds", "Count pulse only", "Look, listen, and feel for airflow and chest rise", "Check pupils"],
    correctIndex: 2,
    explanation: "Breathing assessment includes rate, depth, effort, and chest rise."
  },
  {
    id: 58, level: "EMT", category: "Primary Assessment",
    text: "A patient has a weak radial pulse at 130 and is cool and clammy. This indicates:",
    options: ["Possible shock requiring rapid transport", "Normal athletic response", "Only dehydration without concern", "Hypertension crisis"],
    correctIndex: 0,
    explanation: "Tachycardia with poor skin signs suggests inadequate perfusion."
  },
  {
    id: 59, level: "EMT", category: "Primary Assessment",
    text: "A patient is alert but has severe facial burns and singed nasal hair. You should anticipate:",
    options: ["Only a minor injury", "Immediate need for aspirin", "Airway swelling and early airway compromise (request ALS)", "No airway risk"],
    correctIndex: 2,
    explanation: "Inhalation injury can cause rapid edema; anticipate airway problems and transport."
  },
  {
    id: 60, level: "EMT", category: "Primary Assessment",
    text: "A patient has chest trauma and paradoxical chest movement. This suggests:",
    options: ["Normal breathing pattern", "Flail chest and need for oxygen/ventilatory support", "Isolated ankle injury", "Simple rib bruise only"],
    correctIndex: 1,
    explanation: "Paradoxical motion indicates flail segment; support breathing and rapid transport."
  },

  // 3. Secondary Assessment
  {
    id: 61, level: "EMT", category: "Secondary Assessment",
    text: "In OPQRST, the letter 'P' asks about:",
    options: ["Pulse quality", "Provocation/Palliation (what makes it better or worse)", "Past medical history", "Perforation risk"],
    correctIndex: 1,
    explanation: "OPQRST helps characterize pain; P is provocation/palliation."
  },
  {
    id: 62, level: "EMT", category: "Secondary Assessment",
    text: "In SAMPLE history, 'L' stands for:",
    options: ["Last oral intake", "Lung sounds", "Location of pain", "Level of consciousness"],
    correctIndex: 0,
    explanation: "SAMPLE: Signs/Symptoms, Allergies, Meds, Past history, Last oral intake, Events."
  },
  {
    id: 63, level: "EMT", category: "Secondary Assessment",
    text: "Crackles (rales) heard in both lungs are most associated with:",
    options: ["Upper airway obstruction", "Fluid in the alveoli (e.g., CHF/pulmonary edema)", "Dehydration", "Bronchospasm only"],
    correctIndex: 1,
    explanation: "Crackles suggest fluid; wheezes suggest bronchospasm; stridor is upper airway."
  },
  {
    id: 64, level: "EMT", category: "Secondary Assessment",
    text: "Wheezing is most commonly caused by:",
    options: ["Collapsed lung always", "Bronchospasm in the lower airways", "Nasal congestion", "Fluid overload only"],
    correctIndex: 1,
    explanation: "Wheezes are musical sounds from narrowed lower airways."
  },
  {
    id: 65, level: "EMT", category: "Secondary Assessment",
    text: "A high-pitched sound heard on inhalation over the neck is called:",
    options: ["Rhonchi", "Stridor", "Gurgling", "Crackles"],
    correctIndex: 1,
    explanation: "Stridor indicates upper-airway narrowing and can be life-threatening."
  },
  {
    id: 66, level: "EMT", category: "Secondary Assessment",
    text: "'Rice Krispies' feeling under the skin after chest trauma is called:",
    options: ["Subcutaneous emphysema", "JVD", "Crepitus from arthritis", "Ecchymosis"],
    correctIndex: 0,
    explanation: "Air in subcutaneous tissue feels crackly and suggests air leak."
  },
  {
    id: 67, level: "EMT", category: "Secondary Assessment",
    text: "Unequal pupils after head trauma may indicate:",
    options: ["Normal aging", "Brain injury/increased intracranial pressure", "Simple dehydration", "Only hypoglycemia"],
    correctIndex: 1,
    explanation: "Pupil changes can be a sign of serious head injury or herniation."
  },
  {
    id: 68, level: "EMT", category: "Secondary Assessment",
    text: "Battle's sign and raccoon eyes suggest:",
    options: ["Pulmonary edema", "Basilar skull fracture", "Simple nasal fracture only", "Abdominal bleeding"],
    correctIndex: 1,
    explanation: "These signs indicate skull base fracture and require careful handling."
  },
  {
    id: 69, level: "EMT", category: "Secondary Assessment",
    text: "Jugular vein distention with hypotension after trauma is most consistent with:",
    options: ["Simple dehydration", "Obstructive shock (e.g., tension pneumothorax/cardiac tamponade)", "Neurogenic shock", "Heat exhaustion"],
    correctIndex: 1,
    explanation: "JVD + hypotension post-trauma suggests obstructive causes."
  },
  {
    id: 70, level: "EMT", category: "Secondary Assessment",
    text: "Tracheal deviation away from injured side may indicate:",
    options: ["Stroke", "Asthma attack", "Tension pneumothorax", "Gastritis"],
    correctIndex: 2,
    explanation: "Tension pneumothorax can push the trachea away; treat as life threat."
  },
  {
    id: 71, level: "EMT", category: "Secondary Assessment",
    text: "Pain in the right lower quadrant with rebound tenderness suggests possible:",
    options: ["Appendicitis", "Asthma", "Sprained wrist", "Stroke"],
    correctIndex: 0,
    explanation: "RLQ pain with rebound can indicate peritoneal irritation/appendicitis."
  },
  {
    id: 72, level: "EMT", category: "Secondary Assessment",
    text: "A patient's pulse is rapid and weak, and skin is cool and clammy. This most likely indicates:",
    options: ["Compensated shock", "Normal perfusion", "Hyperthermia only", "Hypertension"],
    correctIndex: 0,
    explanation: "Tachycardia + poor skin signs suggests shock."
  },
  {
    id: 73, level: "EMT", category: "Secondary Assessment",
    text: "Capillary refill greater than 2 seconds in a child may indicate:",
    options: ["Poor perfusion/shock", "High blood sugar", "Normal hydration", "A broken bone only"],
    correctIndex: 0,
    explanation: "Delayed cap refill can be a sign of poor circulation in pediatrics."
  },
  {
    id: 74, level: "EMT", category: "Secondary Assessment",
    text: "A patient with a history of diabetes is altered. During secondary assessment, the best quick test is:",
    options: ["Check hearing", "Check urine color", "Check blood glucose", "Check dental alignment"],
    correctIndex: 2,
    explanation: "Hypoglycemia is reversible and must be ruled out in AMS."
  },
  {
    id: 75, level: "EMT", category: "Secondary Assessment",
    text: "The term 'DCAP-BTLS' stands for injuries found during:",
    options: ["Radio report only", "A detailed physical exam", "Medication administration", "Ambulance driving"],
    correctIndex: 1,
    explanation: "DCAP-BTLS is a head-to-toe exam tool for trauma assessment."
  },
  {
    id: 76, level: "EMT", category: "Secondary Assessment",
    text: "If you find deformity and crepitus in a limb, you should suspect:",
    options: ["A stroke", "A fracture", "A mild sprain only", "Normal finding"],
    correctIndex: 1,
    explanation: "Deformity/crepitus after trauma is consistent with fracture."
  },
  {
    id: 77, level: "EMT", category: "Secondary Assessment",
    text: "A patient's abdomen is rigid and board-like after trauma. This suggests:",
    options: ["Simple constipation", "Only anxiety", "Possible internal bleeding/peritonitis", "Normal muscle tone"],
    correctIndex: 2,
    explanation: "Rigidity indicates irritation/bleeding and is concerning."
  },
  {
    id: 78, level: "EMT", category: "Secondary Assessment",
    text: "Kussmaul respirations (deep, rapid) are most associated with:",
    options: ["Pulmonary edema only", "Metabolic acidosis (e.g., DKA)", "Opioid overdose", "Stroke only"],
    correctIndex: 1,
    explanation: "Kussmaul is compensatory breathing for acidosis."
  },
  {
    id: 79, level: "EMT", category: "Secondary Assessment",
    text: "A sweet/fruit odor on the breath with polyuria/polydipsia suggests:",
    options: ["Heart attack", "Opioid overdose", "Diabetic ketoacidosis", "Allergic reaction"],
    correctIndex: 2,
    explanation: "Fruity breath and dehydration signs point to DKA."
  },
  {
    id: 80, level: "EMT", category: "Secondary Assessment",
    text: "A patient's skin is warm and flushed early in sepsis. This is described as:",
    options: ["Cardiogenic shock pattern", "Distributive (septic) shock pattern", "Obstructive shock only", "Normal finding"],
    correctIndex: 1,
    explanation: "Early sepsis can present with warm skin and tachycardia before becoming cool."
  },
  {
    id: 81, level: "EMT", category: "Secondary Assessment",
    text: "In a trauma patient, blood pressure is 90/60 and pulse is 128. This indicates:",
    options: ["Hypertension emergency", "Possible decompensated shock", "Only pain response", "Normal vital signs"],
    correctIndex: 1,
    explanation: "Hypotension with tachycardia in trauma suggests significant shock."
  },
  {
    id: 82, level: "EMT", category: "Secondary Assessment",
    text: "A patient has pelvic pain after MVC and unstable pelvis. Best action is to:",
    options: ["Have the patient walk", "Ignore pelvic pain", "Stabilize the pelvis and minimize movement", "Rock the pelvis repeatedly"],
    correctIndex: 2,
    explanation: "Pelvic fractures can bleed massively; stabilize and avoid repeated manipulation."
  },
  {
    id: 83, level: "EMT", category: "Secondary Assessment",
    text: "A patient has wheezing that improves after inhaler use. Your reassessment should include:",
    options: ["Only pupil size", "Work of breathing and lung sounds", "Only temperature", "Only ankle exam"],
    correctIndex: 1,
    explanation: "Always reassess respiratory effort, sounds, and oxygenation after treatment."
  },
  {
    id: 84, level: "EMT", category: "Secondary Assessment",
    text: "A patient has chest pain that is worse with inspiration and palpation. This is more suggestive of:",
    options: ["Musculoskeletal pain (still rule out serious causes)", "Stroke", "Anaphylaxis", "STEMI for sure"],
    correctIndex: 0,
    explanation: "Pleuritic/reproducible pain is often musculoskeletal, but evaluate for PE/ACS."
  },
  {
    id: 85, level: "EMT", category: "Secondary Assessment",
    text: "The best way to quantify pain is to use:",
    options: ["Blood glucose only", "A 0-10 pain scale", "Pupil size only", "Skin color only"],
    correctIndex: 1,
    explanation: "Pain scale helps track severity and response to treatment."
  },
  {
    id: 86, level: "EMT", category: "Secondary Assessment",
    text: "A patient is dizzy on standing and has dry mucous membranes. This suggests:",
    options: ["Dehydration/hypovolemia", "Basilar skull fracture", "Hypertensive crisis", "Fluid overload"],
    correctIndex: 0,
    explanation: "Orthostatic symptoms and dryness point to low volume."
  },
  {
    id: 87, level: "EMT", category: "Secondary Assessment",
    text: "A patient has sudden severe headache 'worst of life' with vomiting. This could indicate:",
    options: ["Sprained ankle", "Intracranial hemorrhage", "Simple tension headache only", "Appendicitis"],
    correctIndex: 1,
    explanation: "Thunderclap headache can indicate bleeding; treat as a neurologic emergency."
  },
  {
    id: 88, level: "EMT", category: "Secondary Assessment",
    text: "A patient with COPD has pink, frothy sputum. This is more consistent with:",
    options: ["Dehydration", "Heat exhaustion", "Pulmonary edema/CHF", "Simple asthma"],
    correctIndex: 2,
    explanation: "Pink frothy sputum and crackles suggest pulmonary edema."
  },
  {
    id: 89, level: "EMT", category: "Secondary Assessment",
    text: "A patient's skin is cyanotic with normal breathing rate. Best interpretation is:",
    options: ["No problem because rate is normal", "Only anxiety", "Oxygenation problem (assess SpO2 and airway/breathing effort)", "Only high blood pressure"],
    correctIndex: 2,
    explanation: "Normal rate does not guarantee adequate oxygenation; assess SpO2 and effort."
  },
  {
    id: 90, level: "EMT", category: "Secondary Assessment",
    text: "During reassessment, the most important action is to:",
    options: ["Only document at the end", "Ignore changes if patient is talking", "Only ask new questions", "Repeat vital signs and evaluate response to interventions"],
    correctIndex: 3,
    explanation: "Trending vitals and symptoms tells you if your treatment is working."
  },

  // 4. Scene Size-Up
  {
    id: 91, level: "EMT", category: "Scene Size-Up",
    text: "You arrive at a crash and see downed power lines on the vehicle. You should:",
    options: ["Stage at a safe distance and wait for the utility company/fire", "Approach to assess the patient immediately", "Touch the line with a tool to move it", "Park under the lines to block traffic"],
    correctIndex: 0,
    explanation: "Downed lines can energize the car/ground; keep clear until scene is secured."
  },
  {
    id: 92, level: "EMT", category: "Scene Size-Up",
    text: "At a scene, you smell gasoline and see a leak. Best action is to:",
    options: ["Move to a safe area and request fire/rescue", "Ignore it if no flames", "Use a flare near the leak", "Start the engine to move the car"],
    correctIndex: 0,
    explanation: "Fuel vapors are explosive; control hazards and request appropriate resources."
  },
  {
    id: 93, level: "EMT", category: "Scene Size-Up",
    text: "You see a HazMat placard with a flame symbol and number 3. You should:",
    options: ["Park 50 feet away on the downhill side", "Approach from upwind/uphill and wait for HazMat", "Enter to rescue immediately without PPE", "Walk closer to read the UN number"],
    correctIndex: 1,
    explanation: "HazMat scenes require distance and safe approach; stay upwind and uphill."
  },
  {
    id: 94, level: "EMT", category: "Scene Size-Up",
    text: "A patient is lying in a pool of unknown chemicals. You should first:",
    options: ["Drag the patient out bare-handed", "Ventilate with BVM while kneeling in the liquid", "Avoid contact and request HazMat/decon", "Taste the substance"],
    correctIndex: 2,
    explanation: "Prevent responder contamination; scene safety first."
  },
  {
    id: 95, level: "EMT", category: "Scene Size-Up",
    text: "You arrive at a shooting scene and the suspect location is unknown. You should:",
    options: ["Stage and wait for law enforcement to secure the scene", "Enter quickly to start care", "Turn on sirens and approach the victim", "Pick up shell casings to clear the area"],
    correctIndex: 0,
    explanation: "An unsecured violent scene is unsafe; wait for law enforcement."
  },
  {
    id: 96, level: "EMT", category: "Scene Size-Up",
    text: "You respond to a house with possible carbon monoxide exposure. Best initial step is to:",
    options: ["Use an open flame to 'test' air", "Ensure your crew safety and ventilate/evacuate if indicated", "Ignore CO if patient is awake", "Enter and stay inside to gather history"],
    correctIndex: 1,
    explanation: "CO is odorless and deadly; protect yourself and move patients to fresh air."
  },
  {
    id: 97, level: "EMT", category: "Scene Size-Up",
    text: "You arrive at a multi-vehicle collision with 8 patients. Your first action is to:",
    options: ["Request additional resources and begin triage", "Transport the least injured first", "Start a full head-to-toe on the first patient you see", "Wait for families to arrive"],
    correctIndex: 0,
    explanation: "Multiple patients require early resource request and triage."
  },
  {
    id: 98, level: "EMT", category: "Scene Size-Up",
    text: "A bystander states a patient fell 20 feet. This is most important for determining:",
    options: ["Mechanism of injury and potential severity", "Preferred hospital", "Patient's insurance", "Medication allergies"],
    correctIndex: 0,
    explanation: "MOI guides suspicion for internal injury and need for rapid transport."
  },
  {
    id: 99, level: "EMT", category: "Scene Size-Up",
    text: "At an MVC, airbags deployed and the steering wheel is bent. This suggests:",
    options: ["Only ankle injury risk", "Significant force and possible chest injury", "Low-speed minor injury only", "No injury risk"],
    correctIndex: 1,
    explanation: "Vehicle deformity indicates significant energy transfer and higher injury risk."
  },
  {
    id: 100, level: "EMT", category: "Scene Size-Up",
    text: "When arriving to a scene, the best way to prevent infection is:",
    options: ["Use BSI/PPE based on exposure risk", "Reuse dirty gloves to save time", "Only wash hands after the call", "Skip gloves if patient looks clean"],
    correctIndex: 0,
    explanation: "BSI precautions reduce exposure to blood/body fluids."
  },
  {
    id: 101, level: "EMT", category: "Scene Size-Up",
    text: "You arrive at a scene with an aggressive dog. Best action is to:",
    options: ["Throw equipment at the dog", "Ensure scene safety and request animal control/law enforcement if needed", "Approach and try to pet the dog", "Ignore the dog and enter anyway"],
    correctIndex: 1,
    explanation: "Aggressive animals are a scene hazard; manage before patient contact."
  },
  {
    id: 102, level: "EMT", category: "Scene Size-Up",
    text: "On arrival, you see two vehicles and one patient walking around. Your first step is to:",
    options: ["Move vehicles before counting patients", "Begin detailed assessment immediately", "Assume only one patient", "Determine number of patients and request needed resources"],
    correctIndex: 3,
    explanation: "Scene size-up includes number of patients and additional help."
  },
  {
    id: 103, level: "EMT", category: "Scene Size-Up",
    text: "You arrive at a fall scene in a cluttered bathroom with water on the floor. You should:",
    options: ["Ignore the slippery floor", "Identify hazards and make the area safe before patient movement", "Run into the room quickly", "Turn off lights to calm patient"],
    correctIndex: 1,
    explanation: "Prevent rescuer injury; address environmental hazards first."
  },
  {
    id: 104, level: "EMT", category: "Scene Size-Up",
    text: "A patient is trapped in a vehicle with smoke in the cabin. Best action is to:",
    options: ["Request fire/rescue for extrication and manage airway once safe", "Use a lighter for visibility", "Enter through smoke without protection", "Wait in the ambulance without calling for help"],
    correctIndex: 0,
    explanation: "Fire/extrication resources are needed; safety first."
  },
  {
    id: 105, level: "EMT", category: "Scene Size-Up",
    text: "You arrive to find a patient on a ladder that is unstable. You should:",
    options: ["Tell the patient to jump", "Stabilize the scene and request rescue resources before access", "Shake the ladder to test it", "Climb quickly with equipment"],
    correctIndex: 1,
    explanation: "Prevent secondary injury; ensure safe access."
  },
  {
    id: 106, level: "EMT", category: "Scene Size-Up",
    text: "At a construction site, a patient is near moving machinery. You should:",
    options: ["Stop the machinery and secure the scene if possible", "Stand in the blind spot of equipment", "Ignore workers' warnings", "Treat the patient while machinery runs"],
    correctIndex: 0,
    explanation: "Moving machinery is a major hazard; secure the area."
  },
  {
    id: 107, level: "EMT", category: "Scene Size-Up",
    text: "You arrive and see a patient with severe bleeding while traffic is flowing nearby. First step is to:",
    options: ["Walk into traffic to reach patient", "Protect the scene (traffic control) and request additional help", "Ignore traffic and treat", "Park in the travel lane without cones"],
    correctIndex: 1,
    explanation: "Traffic is a common EMS hazard; scene safety and visibility are critical."
  },
  {
    id: 108, level: "EMT", category: "Scene Size-Up",
    text: "A call comes in for an unconscious person in an apartment with drug paraphernalia visible. Your scene size-up should include:",
    options: ["Letting bystanders dispose of evidence", "Refusing to enter ever", "Awareness of possible needles and law enforcement needs", "Ignoring needle risk"],
    correctIndex: 2,
    explanation: "Sharps risk and scene security are considerations; use PPE and request help if needed."
  },
  {
    id: 109, level: "EMT", category: "Scene Size-Up",
    text: "At an MCI, the first operational goal is to:",
    options: ["Transport without triage", "Establish incident command and organize triage/treatment/transport", "Treat the first patient you touch only", "Wait for hospital direction"],
    correctIndex: 1,
    explanation: "ICS organizes resources and improves outcomes in MCIs."
  },
  {
    id: 110, level: "EMT", category: "Scene Size-Up",
    text: "You arrive to a patient collapsed in a warehouse with strong chemical odor. Best initial action is to:",
    options: ["Hold your breath and go in", "Stage and request HazMat; do not enter the hot zone", "Enter quickly with a surgical mask", "Send a bystander to rescue"],
    correctIndex: 1,
    explanation: "Do not enter unknown hazardous atmospheres; use HazMat protocols."
  },
  {
    id: 111, level: "EMT", category: "Scene Size-Up",
    text: "At a scene, bystanders are crowding and filming, interfering with care. Best action is to:",
    options: ["Request law enforcement assistance and establish a safe work area", "Confiscate phones", "Ignore and continue without control", "Argue with the crowd while delaying care"],
    correctIndex: 0,
    explanation: "Scene control improves safety and patient care; involve law enforcement as needed."
  },
  {
    id: 112, level: "EMT", category: "Scene Size-Up",
    text: "You arrive to a pediatric call and a parent is hysterical. Scene size-up priority is to:",
    options: ["Tell the parent to leave or you won't treat", "Maintain calm communication and ensure a safe, controlled environment", "Ignore the parent completely", "Delay care until parent calms down alone"],
    correctIndex: 1,
    explanation: "Effective scene control includes communication to reduce chaos."
  },
  {
    id: 113, level: "EMT", category: "Scene Size-Up",
    text: "At a vehicle crash, you notice an undeployed airbag and the patient is still in the seat. You should:",
    options: ["Cut the airbag open", "Disable the car by pulling random wires", "Avoid the airbag deployment zone during care/extrication", "Lean directly over the airbag"],
    correctIndex: 2,
    explanation: "Undeployed airbags can deploy and injure responders/patients."
  },
  {
    id: 114, level: "EMT", category: "Scene Size-Up",
    text: "A patient fell and may have neck pain. During scene size-up, you should consider:",
    options: ["Only assessing the ankle", "Spinal precautions based on MOI and findings", "Ignoring c-spine because they're awake", "Transporting without assessment"],
    correctIndex: 1,
    explanation: "MOI and symptoms guide need for spinal motion restriction."
  },
  {
    id: 115, level: "EMT", category: "Scene Size-Up",
    text: "At a motor vehicle crash, there is broken glass and sharp metal. Best PPE addition is:",
    options: ["Eye protection and heavy gloves as needed", "Only a cloth mask", "No PPE needed", "Open-toed shoes"],
    correctIndex: 0,
    explanation: "Protect against sharps and body fluids with appropriate PPE."
  },
  {
    id: 116, level: "EMT", category: "Scene Size-Up",
    text: "You arrive to a home with hoarding conditions and narrow pathways. Best action is to:",
    options: ["Plan safe egress/extrication and request additional help early", "Force a path quickly without planning", "Ignore the environment", "Carry the patient alone"],
    correctIndex: 0,
    explanation: "Difficult access requires planning and more resources for safe movement."
  },
  {
    id: 117, level: "EMT", category: "Scene Size-Up",
    text: "A patient is found at a party with multiple intoxicated people and escalating conflict. You should:",
    options: ["Request law enforcement and stage until scene is safe", "Ignore the risk because it's medical", "Enter alone to take control", "Argue with intoxicated people"],
    correctIndex: 0,
    explanation: "Potential violence is a safety threat; wait for scene security."
  },
  {
    id: 118, level: "EMT", category: "Scene Size-Up",
    text: "At a scene with suspected child abuse, EMS should:",
    options: ["Provide care and document objective findings; report per law/protocol", "Ignore findings to avoid conflict", "Confront the caregiver aggressively", "Only tell friends"],
    correctIndex: 0,
    explanation: "Mandatory reporting and objective documentation are required."
  },
  {
    id: 119, level: "EMT", category: "Scene Size-Up",
    text: "A patient collapses at a pool. During scene size-up, the most important immediate environmental concern is:",
    options: ["Taking photos of the scene", "Water safety and safe access (avoid becoming a victim)", "Asking about insurance first", "Waiting for the lifeguard if patient is pulseless"],
    correctIndex: 1,
    explanation: "Rescuer safety and safe access are first; then rapid rescue and care."
  },
  {
    id: 120, level: "EMT", category: "Scene Size-Up",
    text: "You arrive at a farm and a patient is near a running grain auger. Your first action is to:",
    options: ["Ignore the machinery because it's outdoors", "Shut down equipment and secure the scene before approach", "Reach in to pull the patient out", "Climb on equipment while it runs"],
    correctIndex: 1,
    explanation: "Farm machinery can entrap and amputate; stop hazards before contact."
  },

  // 5. EMS Operations
  {
    id: 121, level: "EMT", category: "EMS Operations",
    text: "A competent adult refuses transport after you explain risks. To reduce liability, you should:",
    options: ["Leave without documentation", "Document the refusal, have a witness sign, and offer to call back if symptoms worsen", "Threaten arrest to force transport", "Take the patient's belongings as collateral"],
    correctIndex: 1,
    explanation: "Proper refusal includes capacity, informed decision, documentation, and witnesses."
  },
  {
    id: 122, level: "EMT", category: "EMS Operations",
    text: "Leaving a patient after starting care without equal or higher-level care taking over is called:",
    options: ["Negligence", "Abandonment", "Assault", "Slander"],
    correctIndex: 1,
    explanation: "Abandonment is terminating care without ensuring continued care."
  },
  {
    id: 123, level: "EMT", category: "EMS Operations",
    text: "Providing care without consent to a competent adult can be considered:",
    options: ["Negligence only", "Battery", "Defamation", "Duty to act"],
    correctIndex: 1,
    explanation: "Battery is unlawful physical contact; consent is required unless implied/unconscious."
  },
  {
    id: 124, level: "EMT", category: "EMS Operations",
    text: "Threatening a patient with harm to gain compliance is:",
    options: ["Battery", "Assault", "Scope of practice", "Abandonment"],
    correctIndex: 1,
    explanation: "Assault is threat of harm; battery is actual contact."
  },
  {
    id: 125, level: "EMT", category: "EMS Operations",
    text: "Failing to act as a reasonable EMT would under similar circumstances is:",
    options: ["Libel", "Negligence", "Good Samaritan", "Emancipation"],
    correctIndex: 1,
    explanation: "Negligence is breach of duty that results in harm."
  },
  {
    id: 126, level: "EMT", category: "EMS Operations",
    text: "The most important reason for thorough documentation is:",
    options: ["It makes the call shorter", "It replaces patient assessment", "It is the legal record of your assessment and care", "It guarantees no lawsuits"],
    correctIndex: 2,
    explanation: "PCRs are legal documents; accurate objective charting matters."
  },
  {
    id: 127, level: "EMT", category: "EMS Operations",
    text: "You should use radio communications primarily to:",
    options: ["Request resources and give concise patient reports", "Discuss gossip about the patient", "Debate protocols on air", "Share patient's social security number"],
    correctIndex: 0,
    explanation: "Radio should be professional, concise, and protect privacy."
  },
  {
    id: 128, level: "EMT", category: "EMS Operations",
    text: "A patient's protected health information should be shared only:",
    options: ["With family without permission always", "With those directly involved in care or as required by law", "On social media if no name is used", "With any bystander who asks"],
    correctIndex: 1,
    explanation: "HIPAA requires limiting disclosure to necessary parties."
  },
  {
    id: 129, level: "EMT", category: "EMS Operations",
    text: "Standard Precautions means you treat all blood/body fluids as:",
    options: ["Not infectious if the patient is family", "Safe if it looks clean", "Potentially infectious", "Only infectious if the patient has HIV"],
    correctIndex: 2,
    explanation: "Assume infectious risk and use PPE appropriately."
  },
  {
    id: 130, level: "EMT", category: "EMS Operations",
    text: "The most effective way to prevent infection spread is:",
    options: ["Skipping cleaning if you're busy", "Hand hygiene", "Only using perfume", "Wearing two pairs of boots"],
    correctIndex: 1,
    explanation: "Handwashing/hand sanitizer is the cornerstone of infection control."
  },
  {
    id: 131, level: "EMT", category: "EMS Operations",
    text: "When moving a patient, the best technique is to:",
    options: ["Lift with your legs and keep the load close", "Lift with a rounded back", "Twist at the waist while lifting", "Lift and rotate quickly"],
    correctIndex: 0,
    explanation: "Proper body mechanics reduce back injury risk."
  },
  {
    id: 132, level: "EMT", category: "EMS Operations",
    text: "The safest method to back an ambulance is to:",
    options: ["Use a spotter when available", "Back quickly to save time", "Rely only on mirrors", "Turn off backup alarm"],
    correctIndex: 0,
    explanation: "Spotters reduce backing collisions and injuries."
  },
  {
    id: 133, level: "EMT", category: "EMS Operations",
    text: "At intersections, an ambulance operating with lights/siren should:",
    options: ["Proceed without slowing", "Assume other drivers will stop", "Come to a complete stop and proceed when clear", "Turn off headlights"],
    correctIndex: 2,
    explanation: "Due regard is required; intersections are high-risk."
  },
  {
    id: 134, level: "EMT", category: "EMS Operations",
    text: "A DNR order means EMS should:",
    options: ["Only provide CPR without defibrillation", "Withhold all care", "Follow local protocol and verify the document before withholding resuscitation", "Ignore it always"],
    correctIndex: 2,
    explanation: "DNR affects resuscitation, not comfort care; verify validity and follow protocol."
  },
  {
    id: 135, level: "EMT", category: "EMS Operations",
    text: "A patient is a minor but is married and living independently. This is an example of:",
    options: ["Implied consent only", "Emancipated minor (can consent)", "Involuntary commitment", "Abandonment"],
    correctIndex: 1,
    explanation: "Emancipated minors can usually consent to care."
  },
  {
    id: 136, level: "EMT", category: "EMS Operations",
    text: "Implied consent applies when a patient is:",
    options: ["Only mildly anxious", "Unconscious or unable to make decisions in an emergency", "Asking questions", "Refusing care clearly"],
    correctIndex: 1,
    explanation: "In emergencies, consent is presumed to save life/limb."
  },
  {
    id: 137, level: "EMT", category: "EMS Operations",
    text: "You find evidence of elder abuse. You should:",
    options: ["Post about it online", "Report per law/protocol and document objective findings", "Confront the suspected abuser aggressively", "Ignore it to avoid conflict"],
    correctIndex: 1,
    explanation: "Mandatory reporting and objective documentation are required."
  },
  {
    id: 138, level: "EMT", category: "EMS Operations",
    text: "The best example of objective documentation is:",
    options: ["'Skin pale and diaphoretic; radial pulse 124, weak'", "'Looks fine to me'", "'Patient is faking'", "'Patient is a jerk'"],
    correctIndex: 0,
    explanation: "Chart measurable findings, not opinions."
  },
  {
    id: 139, level: "EMT", category: "EMS Operations",
    text: "A patient's refusal is valid only if they have:",
    options: ["No family present", "Decision-making capacity (alert, understands risks/benefits)", "A signed insurance card", "A low pain score"],
    correctIndex: 1,
    explanation: "Capacity and informed understanding are essential for refusal."
  },
  {
    id: 140, level: "EMT", category: "EMS Operations",
    text: "If you make an error in a PCR, you should:",
    options: ["Follow agency policy (single line, initial/date, no erasing)", "White-out the mistake", "Rewrite without noting change", "Delete the entire report"],
    correctIndex: 0,
    explanation: "Maintain integrity of the legal record; never obscure entries."
  },
  {
    id: 141, level: "EMT", category: "EMS Operations",
    text: "The primary purpose of triage in an MCI is to:",
    options: ["Do the greatest good for the greatest number", "Guarantee everyone survives", "Treat the first patient you see", "Transport the most injured last"],
    correctIndex: 0,
    explanation: "Triage prioritizes resources to maximize overall survival."
  },
  {
    id: 142, level: "EMT", category: "EMS Operations",
    text: "The START triage method uses which key assessment?",
    options: ["Temperature only", "Respirations, perfusion, and mental status", "ECG rhythm only", "Blood glucose, pupils, pain score"],
    correctIndex: 1,
    explanation: "START quickly categorizes based on RPM."
  },
  {
    id: 143, level: "EMT", category: "EMS Operations",
    text: "If a patient is infectious and coughing, the best mask choice for the patient is:",
    options: ["A surgical mask on the patient (source control)", "A cloth scarf only", "No mask needed", "N95 on the patient only"],
    correctIndex: 0,
    explanation: "Source control reduces droplet spread; responders use appropriate PPE."
  },
  {
    id: 144, level: "EMT", category: "EMS Operations",
    text: "To reduce risk of needlestick injury, you should:",
    options: ["Never recap needles and dispose in sharps container immediately", "Carry needles in pockets", "Break needles before disposal", "Recap needles carefully"],
    correctIndex: 0,
    explanation: "Use sharps safety practices to prevent exposure."
  },
  {
    id: 145, level: "EMT", category: "EMS Operations",
    text: "When lifting a stretcher with a partner, you should:",
    options: ["Coordinate commands and lift together", "Twist while lifting", "Rush without communication", "Lift independently at different times"],
    correctIndex: 0,
    explanation: "Team communication prevents drops and injuries."
  },
  {
    id: 146, level: "EMT", category: "EMS Operations",
    text: "A quality patient handoff should include:",
    options: ["A long unrelated story", "Chief complaint, pertinent findings, treatment, and response", "Only the patient's name", "No vital signs"],
    correctIndex: 1,
    explanation: "Concise handoff improves continuity of care."
  },
  {
    id: 147, level: "EMT", category: "EMS Operations",
    text: "If you witness a coworker diverting controlled substances, you should:",
    options: ["Report through appropriate chain of command per policy", "Tell the patient", "Ignore it to avoid conflict", "Confront them on social media"],
    correctIndex: 0,
    explanation: "Diversion is serious and must be reported through proper channels."
  },
  {
    id: 148, level: "EMT", category: "EMS Operations",
    text: "When transporting a patient, the single most important safety device is:",
    options: ["Seat belts/restraints for everyone", "Siren volume", "Extra oxygen tanks", "A larger radio"],
    correctIndex: 0,
    explanation: "Restraints prevent injury in crashes; use them consistently."
  },
  {
    id: 149, level: "EMT", category: "EMS Operations",
    text: "A patient's care report should be completed:",
    options: ["As soon as possible after the call with accurate times and findings", "Only if the patient complains", "Weeks later from memory", "Only if you gave medication"],
    correctIndex: 0,
    explanation: "Timely documentation improves accuracy and legal defensibility."
  },
  {
    id: 150, level: "EMT", category: "EMS Operations",
    text: "Medical direction given in advance through protocols is called:",
    options: ["Standing orders", "On-line orders only", "Abandonment", "Triage tags"],
    correctIndex: 0,
    explanation: "Standing orders allow treatment per written protocol when criteria are met."
  },

  // ================= PARAMEDIC CATEGORIES =================
  // 1. Clinical Judgment
  {
    id: 151, level: "Paramedic", category: "Clinical Judgment",
    text: "A febrile patient is hypotensive (82/48), tachycardic, and has warm flushed skin early on. Most likely shock type is:",
    options: ["Septic (distributive) shock", "Obstructive shock from tamponade", "Cardiogenic shock", "Hypovolemic shock from hemorrhage"],
    correctIndex: 0,
    explanation: "Early sepsis can present warm with hypotension/tachycardia; treat per sepsis protocol."
  },
  {
    id: 152, level: "Paramedic", category: "Clinical Judgment",
    text: "A patient with suspected sepsis has hypotension after fluids. Next best vasoactive support is typically:",
    options: ["Nitroglycerin drip", "Norepinephrine infusion (per protocol)", "Furosemide bolus", "Adenosine push"],
    correctIndex: 1,
    explanation: "If fluid-refractory septic shock, vasopressors like norepinephrine are commonly first-line."
  },
  {
    id: 153, level: "Paramedic", category: "Clinical Judgment",
    text: "An altered patient is diaphoretic, tachycardic, and has BGL 34 mg/dL. Best immediate treatment is:",
    options: ["Naloxone first", "IV dextrose (or IM glucagon if no IV) per protocol", "Sodium bicarbonate", "Aspirin"],
    correctIndex: 1,
    explanation: "Correct hypoglycemia immediately; it's rapidly reversible and life-threatening."
  },
  {
    id: 154, level: "Paramedic", category: "Clinical Judgment",
    text: "A patient has pinpoint pupils, bradycardia, bronchorrhea, and muscle fasciculations after pesticide exposure. Most likely toxidrome is:",
    options: ["Organophosphate poisoning", "Anticholinergic toxicity", "Sympathomimetic overdose", "Opioid overdose only"],
    correctIndex: 0,
    explanation: "Cholinergic signs (SLUDGE/DUMBELS) suggest organophosphate exposure."
  },
  {
    id: 155, level: "Paramedic", category: "Clinical Judgment",
    text: "For organophosphate poisoning with severe bronchorrhea, first-line antidotal therapy is:",
    options: ["Atropine (and pralidoxime if available) per protocol", "Naloxone", "Calcium chloride", "Flumazenil"],
    correctIndex: 0,
    explanation: "Atropine dries secretions and improves bradycardia; pralidoxime helps reverse enzyme binding."
  },
  {
    id: 156, level: "Paramedic", category: "Clinical Judgment",
    text: "A patient with TCA overdose has wide QRS and hypotension. Best targeted therapy is:",
    options: ["Furosemide", "Sodium bicarbonate", "Magnesium sulfate", "Diltiazem"],
    correctIndex: 1,
    explanation: "Bicarb narrows QRS and treats sodium-channel blockade in TCA toxicity."
  },
  {
    id: 157, level: "Paramedic", category: "Clinical Judgment",
    text: "A patient with hyperkalemia shows peaked T waves and widening QRS. First action to stabilize the heart is:",
    options: ["IV calcium (chloride or gluconate) per protocol", "Furosemide only", "Adenosine", "Insulin only without glucose"],
    correctIndex: 0,
    explanation: "Calcium stabilizes myocardial membrane before shifting potassium."
  },
  {
    id: 158, level: "Paramedic", category: "Clinical Judgment",
    text: "A patient with DKA is tachypneic with Kussmaul respirations and abdominal pain. The key prehospital priorities are:",
    options: ["Immediate insulin bolus", "Fluids, airway/ventilation support, and transport", "Diuretics", "Nitroglycerin drip"],
    correctIndex: 1,
    explanation: "Prehospital care is supportive; insulin is hospital-based in most systems."
  },
  {
    id: 159, level: "Paramedic", category: "Clinical Judgment",
    text: "A patient with COPD is somnolent with high ETCO2. The best respiratory support is:",
    options: ["Give furosemide", "Withhold oxygen completely", "Assist ventilation (BVM/vent) and titrate oxygen", "Hyperventilate aggressively"],
    correctIndex: 2,
    explanation: "Hypercapnic failure needs ventilatory support; avoid over-oxygenation but do not withhold O2."
  },
  {
    id: 160, level: "Paramedic", category: "Clinical Judgment",
    text: "A patient has severe dyspnea, wheezes, silent chest, and fatigue. This suggests:",
    options: ["Mild asthma", "Simple anxiety only", "Impending respiratory failure in severe asthma", "Bronchitis without concern"],
    correctIndex: 2,
    explanation: "Silent chest with exhaustion is ominous; prepare for ventilation/intubation."
  },
  {
    id: 161, level: "Paramedic", category: "Clinical Judgment",
    text: "A patient has sudden tearing chest pain radiating to the back and unequal BP in arms. Suspect:",
    options: ["Pericarditis only", "Gastritis", "Aortic dissection", "Stable angina"],
    correctIndex: 2,
    explanation: "Tearing pain + pulse/BP differential suggests dissection; avoid thrombolytics."
  },
  {
    id: 162, level: "Paramedic", category: "Clinical Judgment",
    text: "A patient has pleuritic chest pain, tachycardia, and hypoxia after long flight. Suspect:",
    options: ["Migraine", "Pulmonary embolism", "Appendicitis", "GERD"],
    correctIndex: 1,
    explanation: "Risk factors + hypoxia + pleuritic pain suggest PE."
  },
  {
    id: 163, level: "Paramedic", category: "Clinical Judgment",
    text: "A patient is post-ictal after a witnessed seizure, now protecting airway and breathing adequately. Best next step is to:",
    options: ["Force oral fluids", "Immediately intubate", "Check glucose and look for causes/injury", "Give naloxone to everyone"],
    correctIndex: 2,
    explanation: "After stabilization, evaluate reversible causes (e.g., hypoglycemia) and trauma."
  },
  {
    id: 164, level: "Paramedic", category: "Clinical Judgment",
    text: "A patient with suspected stroke has BP 220/120 but no signs of hemorrhage. Prehospital BP goal is generally:",
    options: ["Avoid aggressive lowering unless per protocol (support ABCs)", "Lower BP to normal immediately", "Give nitroglycerin routinely", "Give furosemide"],
    correctIndex: 0,
    explanation: "Over-lowering can reduce cerebral perfusion; follow stroke protocol."
  },
  {
    id: 165, level: "Paramedic", category: "Clinical Judgment",
    text: "A patient is agitated, hyperthermic, tachycardic, and diaphoretic after stimulant use. Best initial management is:",
    options: ["Active cooling", "Atropine", "Benzodiazepines and active cooling", "Naloxone"],
    correctIndex: 2,
    explanation: "Sympathomimetic toxicity responds to benzos, cooling, and supportive care."
  },
  {
    id: 166, level: "Paramedic", category: "Clinical Judgment",
    text: "A diabetic patient is very dehydrated with BGL 820 and minimal ketones (HHS). Key prehospital priority is:",
    options: ["Aggressive fluid resuscitation and transport", "Diuretic", "Insulin bolus", "Hyperventilation"],
    correctIndex: 0,
    explanation: "HHS is profound dehydration; supportive fluids and rapid transport are key."
  },
  {
    id: 167, level: "Paramedic", category: "Clinical Judgment",
    text: "A patient has sudden severe headache with neck stiffness and photophobia. Concern is for:",
    options: ["Simple sinus headache", "Asthma", "Subarachnoid hemorrhage/meningitis (treat as emergent)", "Sprained ankle"],
    correctIndex: 2,
    explanation: "Life-threatening neuro/infectious causes require urgent transport and monitoring."
  },
  {
    id: 168, level: "Paramedic", category: "Clinical Judgment",
    text: "A patient has crushing chest pain with ST elevation in two contiguous leads. Best destination decision is:",
    options: ["Transport to PCI-capable facility (STEMI alert) per system", "Treat on scene for 30 minutes", "Nearest clinic always", "Delay transport for repeat vitals only"],
    correctIndex: 0,
    explanation: "STEMI systems prioritize rapid reperfusion; early notification improves time-to-balloon."
  },
  {
    id: 169, level: "Paramedic", category: "Clinical Judgment",
    text: "A patient is hypotensive with JVD and muffled heart sounds after stab wound. Suspect:",
    options: ["Cardiac tamponade", "Septic shock", "Tension pneumothorax only", "Neurogenic shock"],
    correctIndex: 0,
    explanation: "Beck's triad suggests tamponade; rapid transport and supportive care."
  },
  {
    id: 170, level: "Paramedic", category: "Clinical Judgment",
    text: "A patient is bradycardic, hypotensive, and has dry skin after diphenhydramine overdose. Toxidrome is:",
    options: ["Cholinergic toxicity", "Opioid overdose", "Anticholinergic toxicity", "Serotonin syndrome"],
    correctIndex: 2,
    explanation: "Anticholinergic: dry, hot, tachy (often), delirium; presentations vary but dryness is key."
  },
  {
    id: 171, level: "Paramedic", category: "Clinical Judgment",
    text: "A patient is on beta-blockers and is bradycardic with hypotension after overdose. Best targeted therapy is often:",
    options: ["Naloxone", "Glucagon (per protocol)", "Adenosine", "Aspirin"],
    correctIndex: 1,
    explanation: "Glucagon can improve heart rate/contractility in beta-blocker toxicity."
  },
  {
    id: 172, level: "Paramedic", category: "Clinical Judgment",
    text: "A patient with suspected MI has chest pain and crackles with low BP. You should avoid:",
    options: ["Nitroglycerin if hypotensive or RV infarct suspected", "Cardiac monitoring", "Oxygen if hypoxic", "Aspirin if no contraindication"],
    correctIndex: 0,
    explanation: "Nitrates can worsen hypotension, especially in RV infarct/low preload states."
  },
  {
    id: 173, level: "Paramedic", category: "Clinical Judgment",
    text: "A patient has sudden onset weakness, facial droop, and speech difficulty. The best prehospital scale to use is:",
    options: ["FAST/Cincinnati stroke scale", "GCS only", "START triage", "Burn rule of nines"],
    correctIndex: 0,
    explanation: "Stroke scales quickly identify candidates for stroke pathways."
  },
  {
    id: 174, level: "Paramedic", category: "Clinical Judgment",
    text: "A patient has nausea, vomiting, diarrhea, and abdominal cramping after contaminated food, with signs of dehydration. Best management is:",
    options: ["Supportive care and fluid resuscitation per protocol", "Immediate antibiotics in all cases", "Diuretics", "Nitroglycerin"],
    correctIndex: 0,
    explanation: "Most GI illnesses are supportive prehospital; treat dehydration and monitor."
  },
  {
    id: 175, level: "Paramedic", category: "Clinical Judgment",
    text: "A trauma patient is hypotensive with warm dry skin and bradycardia after spinal injury. Shock type is:",
    options: ["Neurogenic shock", "Cardiogenic shock", "Hypovolemic shock", "Septic shock"],
    correctIndex: 0,
    explanation: "Neurogenic shock can cause hypotension with bradycardia and warm skin."
  },

  // 2. Airway
  {
    id: 176, level: "Paramedic", category: "Airway",
    text: "The most reliable confirmation of endotracheal tube placement in the field is:",
    options: ["Continuous waveform capnography (ETCO2)", "Fogging in the tube", "Chest rise alone", "Auscultation alone"],
    correctIndex: 0,
    explanation: "Waveform capnography is the most dependable confirmation and ongoing monitor."
  },
  {
    id: 177, level: "Paramedic", category: "Airway",
    text: "During RSI, the single most important step to prevent hypoxia is:",
    options: ["Aggressive preoxygenation and apneic oxygenation", "Skipping BVM even if needed", "Cricoid pressure always", "Giving paralytic before oxygen"],
    correctIndex: 0,
    explanation: "Preoxygenation increases oxygen reserve; apneic oxygenation can prolong safe apnea time."
  },
  {
    id: 178, level: "Paramedic", category: "Airway",
    text: "A head-injury patient is intubated. Ventilation should aim to:",
    options: ["Maintain normocapnia (avoid hyperventilation) unless herniation signs", "Hypoventilate to raise ETCO2", "Ignore ETCO2 monitoring", "Hyperventilate to ETCO2 20 routinely"],
    correctIndex: 0,
    explanation: "Hyperventilation decreases cerebral perfusion; target normal ETCO2 unless impending herniation."
  },
  {
    id: 179, level: "Paramedic", category: "Airway",
    text: "Which finding suggests impending airway obstruction in an inhalation burn?",
    options: ["Hoarseness, stridor, and facial burns", "Isolated ankle pain", "Mild headache only", "Normal voice and no soot"],
    correctIndex: 0,
    explanation: "Airway edema can progress rapidly; early airway management may be needed."
  },
  {
    id: 180, level: "Paramedic", category: "Airway",
    text: "In a patient with severe asthma, ventilator strategy should prioritize:",
    options: ["High respiratory rates", "Allowing longer exhalation time to prevent air trapping", "Zero PEEP always", "Very large tidal volumes"],
    correctIndex: 1,
    explanation: "Asthma causes expiratory flow limitation; avoid breath stacking."
  },
  {
    id: 181, level: "Paramedic", category: "Airway",
    text: "A patient has a difficult airway and cannot be intubated or ventilated. Definitive rescue is:",
    options: ["Cricothyrotomy (per protocol)", "Chest compressions", "Oropharyngeal airway only", "Nasal cannula"],
    correctIndex: 0,
    explanation: "Can't intubate/can't ventilate requires a surgical airway per protocol."
  },
  {
    id: 182, level: "Paramedic", category: "Airway",
    text: "For rapid sequence intubation, a common induction agent with hemodynamic stability is:",
    options: ["Etomidate (per protocol)", "Atropine for induction", "Furosemide", "Adenosine"],
    correctIndex: 0,
    explanation: "Etomidate is often used for RSI due to rapid onset and relative stability."
  },
  {
    id: 183, level: "Paramedic", category: "Airway",
    text: "A paralytic contraindicated in hyperkalemia, crush injury, or burns >24 hours is:",
    options: ["Rocuronium", "Succinylcholine", "Midazolam", "Vecuronium"],
    correctIndex: 1,
    explanation: "Succinylcholine can worsen hyperkalemia in these states."
  },
  {
    id: 184, level: "Paramedic", category: "Airway",
    text: "After intubation, the best device to prevent gastric distention during ventilation is:",
    options: ["Forcing air quickly", "Skipping oxygen", "Appropriate BVM technique with proper rate/volume", "Higher tidal volumes always"],
    correctIndex: 2,
    explanation: "Gentle ventilation at correct rate/volume reduces gastric inflation."
  },
  {
    id: 185, level: "Paramedic", category: "Airway",
    text: "An OPA is indicated when the patient:",
    options: ["Is unresponsive and has no gag reflex", "Is awake and vomiting", "Has facial pain but is responsive", "Has intact gag and is alert"],
    correctIndex: 0,
    explanation: "OPAs can provoke vomiting/laryngospasm in patients with gag reflex."
  },
  {
    id: 186, level: "Paramedic", category: "Airway",
    text: "An NPA is relatively contraindicated in:",
    options: ["Asthma", "Diabetes", "Hypertension", "Suspected basilar skull fracture"],
    correctIndex: 3,
    explanation: "Midface trauma/basilar skull fracture increases risk of intracranial placement."
  },
  {
    id: 187, level: "Paramedic", category: "Airway",
    text: "A patient with an advanced airway has ETCO2 suddenly drop to near zero during CPR. The first concern is:",
    options: ["Dislodged tube or circuit problem (then consider ROSC/PE)", "Need more sedation", "Give adenosine", "Normal finding"],
    correctIndex: 0,
    explanation: "Sudden ETCO2 loss suggests disconnection/dislodgement; troubleshoot immediately."
  },
  {
    id: 188, level: "Paramedic", category: "Airway",
    text: "Capnography is most useful during CPR because it can:",
    options: ["Measure blood glucose", "Reflect perfusion/CPR quality and suggest ROSC", "Replace ECG rhythm check", "Diagnose fracture"],
    correctIndex: 1,
    explanation: "ETCO2 correlates with cardiac output during CPR; rising ETCO2 may indicate ROSC."
  },
  {
    id: 189, level: "Paramedic", category: "Airway",
    text: "After intubation, the most appropriate way to secure the tube is:",
    options: ["Commercial tube holder or tape with documented depth", "Tie with elastic around the neck loosely", "Leave it unsecured", "Hold it by hand only"],
    correctIndex: 0,
    explanation: "Securement prevents dislodgement; document depth at teeth/lips."
  },
  {
    id: 190, level: "Paramedic", category: "Airway",
    text: "A post-intubation patient becomes hypotensive. Best initial action is to:",
    options: ["Assess for causes and consider fluid/pressor support per protocol", "Remove the tube immediately", "Give diuretics", "Hyperventilate"],
    correctIndex: 0,
    explanation: "Intubation/positive pressure can drop preload; treat hypotension and reassess ventilation."
  },
  {
    id: 191, level: "Paramedic", category: "Airway",
    text: "A patient with suspected opioid overdose is apneic. The best airway sequence is:",
    options: ["BVM ventilations first, then naloxone per protocol", "Intubate without oxygenation", "CPAP immediately", "Naloxone first without ventilation"],
    correctIndex: 0,
    explanation: "Ventilation is immediate lifesaving action; naloxone supports recovery."
  },
  {
    id: 192, level: "Paramedic", category: "Airway",
    text: "During BVM ventilation with two rescuers, the best technique is:",
    options: ["Two-hand seal with one provider and ventilations by the other", "Ventilate as fast as possible", "No airway positioning needed", "One-hand seal always"],
    correctIndex: 0,
    explanation: "Two-person BVM improves seal and tidal volumes."
  },
  {
    id: 193, level: "Paramedic", category: "Airway",
    text: "When using a supraglottic airway, ongoing confirmation should include:",
    options: ["Blood pressure only", "Pulse oximetry only", "Waveform capnography and chest rise", "Tube fogging only"],
    correctIndex: 2,
    explanation: "Capnography confirms ventilation; reassess frequently."
  },
  {
    id: 194, level: "Paramedic", category: "Airway",
    text: "In pediatric patients, the most common cause of airway obstruction is:",
    options: ["The tongue and soft tissue", "Broken ribs", "Hypertension", "A foreign body always"],
    correctIndex: 0,
    explanation: "Pediatric anatomy predisposes to obstruction; positioning/adjuncts matter."
  },
  {
    id: 195, level: "Paramedic", category: "Airway",
    text: "A child is unresponsive with a pulse and inadequate respirations. The correct ventilation rate is approximately:",
    options: ["One breath every 10 seconds", "One breath every 1 second", "No breaths needed if pulse present", "One breath every 3-5 seconds (12-20/min) per guidelines"],
    correctIndex: 3,
    explanation: "Provide assisted ventilations at pediatric guideline rates."
  },
  {
    id: 196, level: "Paramedic", category: "Airway",
    text: "If you suspect gastric insufflation during ventilation, you should:",
    options: ["Remove oxygen", "Slow the rate and use just enough volume for chest rise", "Stop ventilation completely", "Increase rate and volume"],
    correctIndex: 1,
    explanation: "Over-ventilation forces air into the stomach; ventilate gently."
  },
  {
    id: 197, level: "Paramedic", category: "Airway",
    text: "A patient has stridor and cannot speak after an allergic reaction. Best airway priority is to:",
    options: ["Treat anaphylaxis and prepare for a difficult airway", "Insert an OPA while awake", "Force oral fluids", "Give aspirin and wait"],
    correctIndex: 0,
    explanation: "Upper-airway edema can progress quickly; treat and anticipate advanced airway needs."
  },
  {
    id: 198, level: "Paramedic", category: "Airway",
    text: "For preoxygenation in RSI, the best method is often:",
    options: ["High-flow oxygen with BVM/NRB and PEEP if tolerated", "No oxygen until drugs given", "Room air only", "Low-flow nasal cannula only"],
    correctIndex: 0,
    explanation: "Maximizing oxygen reserve reduces desaturation during apnea."
  },
  {
    id: 199, level: "Paramedic", category: "Airway",
    text: "A ventilated patient's ETCO2 is 55 with normal waveform and patient is hypotensive. Best adjustment is to:",
    options: ["Decrease ventilation to raise ETCO2", "Increase minute ventilation cautiously (rate) while treating underlying cause", "Give adenosine", "Stop ventilation"],
    correctIndex: 1,
    explanation: "ETCO2 reflects ventilation and perfusion; adjust ventilation and treat shock causes."
  },
  {
    id: 200, level: "Paramedic", category: "Airway",
    text: "A patient with suspected increased ICP shows Cushing response. If ventilation is required, ETCO2 should generally be kept:",
    options: ["Unmonitored", "Around normal (35-45) unless directed by protocol for herniation", "Above 60 routinely", "Below 25 routinely"],
    correctIndex: 1,
    explanation: "Aim for normocapnia; only brief hyperventilation for impending herniation per protocol."
  },

  // 3. Cardiology
  {
    id: 201, level: "Paramedic", category: "Cardiology",
    text: "A narrow-complex regular tachycardia at 190 with hypotension and altered mental status requires:",
    options: ["Synchronized cardioversion", "Vagal maneuvers only", "Adenosine first", "Diltiazem infusion"],
    correctIndex: 0,
    explanation: "Unstable tachyarrhythmias need immediate electrical therapy."
  },
  {
    id: 202, level: "Paramedic", category: "Cardiology",
    text: "A stable SVT patient remains in SVT after vagal maneuvers. Next medication is typically:",
    options: ["Magnesium sulfate first", "Amiodarone infusion", "Adenosine (per protocol)", "Epinephrine push"],
    correctIndex: 2,
    explanation: "Adenosine is first-line for stable regular narrow-complex SVT."
  },
  {
    id: 203, level: "Paramedic", category: "Cardiology",
    text: "A patient is in atrial fibrillation with RVR (irregularly irregular) and is unstable. Best action is:",
    options: ["Adenosine", "Vagal maneuvers only", "Synchronized cardioversion", "Defibrillation unsynchronized"],
    correctIndex: 2,
    explanation: "Unstable AF with RVR is treated with synchronized cardioversion."
  },
  {
    id: 204, level: "Paramedic", category: "Cardiology",
    text: "A wide-complex regular tachycardia with a pulse, unstable, should be treated with:",
    options: ["Defibrillation (unsynchronized) immediately", "Adenosine always", "Atropine", "Synchronized cardioversion (consider sedation if time)"],
    correctIndex: 3,
    explanation: "Unstable monomorphic VT with pulse needs synchronized cardioversion."
  },
  {
    id: 205, level: "Paramedic", category: "Cardiology",
    text: "Pulseless VT should be treated with:",
    options: ["Synchronized cardioversion", "Atropine", "Defibrillation and high-quality CPR", "Adenosine"],
    correctIndex: 2,
    explanation: "Pulseless VT is a shockable rhythm: defibrillate and resume CPR."
  },
  {
    id: 206, level: "Paramedic", category: "Cardiology",
    text: "Ventricular fibrillation management starts with:",
    options: ["Adenosine first", "Atropine first", "Immediate defibrillation and CPR", "Synchronized cardioversion"],
    correctIndex: 2,
    explanation: "VF is shockable; defibrillate and perform CPR with minimal pauses."
  },
  {
    id: 207, level: "Paramedic", category: "Cardiology",
    text: "Asystole management includes:",
    options: ["High-quality CPR and epinephrine; search for reversible causes", "Adenosine", "Defibrillation", "Synchronized cardioversion"],
    correctIndex: 0,
    explanation: "Asystole is not shockable; focus on CPR, epi, and H's/T's."
  },
  {
    id: 208, level: "Paramedic", category: "Cardiology",
    text: "PEA treatment priority is:",
    options: ["High-quality CPR and treat reversible causes", "Defibrillation", "Immediate cardioversion", "Adenosine"],
    correctIndex: 0,
    explanation: "PEA is non-shockable; fix underlying cause while doing CPR."
  },
  {
    id: 209, level: "Paramedic", category: "Cardiology",
    text: "A symptomatic bradycardia patient is hypotensive with signs of shock. First-line medication is typically:",
    options: ["Atropine (per protocol)", "Furosemide", "Adenosine", "Diltiazem"],
    correctIndex: 0,
    explanation: "Atropine is first-line for symptomatic bradycardia in many protocols."
  },
  {
    id: 210, level: "Paramedic", category: "Cardiology",
    text: "If atropine fails in unstable bradycardia, the next step is commonly:",
    options: ["Nitroglycerin", "Adenosine", "Vagal maneuvers", "Transcutaneous pacing"],
    correctIndex: 3,
    explanation: "TCP is next for refractory symptomatic bradycardia per ACLS."
  },
  {
    id: 211, level: "Paramedic", category: "Cardiology",
    text: "A patient has chest pain and ST elevation in II, III, aVF. Before giving nitroglycerin, you should suspect:",
    options: ["Hyperventilation syndrome", "Right ventricular infarct and obtain right-sided leads if possible", "Pulmonary embolism only", "Asthma attack"],
    correctIndex: 1,
    explanation: "Inferior MI may involve RV; nitrates can drop preload and worsen hypotension."
  },
  {
    id: 212, level: "Paramedic", category: "Cardiology",
    text: "The single most important early medication for suspected ACS (no contraindications) is:",
    options: ["Diphenhydramine", "Aspirin", "Adenosine", "Furosemide"],
    correctIndex: 1,
    explanation: "Aspirin reduces clot propagation and improves outcomes in ACS."
  },
  {
    id: 213, level: "Paramedic", category: "Cardiology",
    text: "A patient has crushing chest pain and clear lungs with hypertension. After aspirin and oxygen if needed, the next typical therapy is:",
    options: ["Nitroglycerin if not contraindicated", "Naloxone", "Activated charcoal", "Epinephrine"],
    correctIndex: 0,
    explanation: "Nitrates reduce preload/afterload and relieve ischemic pain when BP allows."
  },
  {
    id: 214, level: "Paramedic", category: "Cardiology",
    text: "A patient has bradycardia with peaked T waves and wide QRS. The targeted immediate treatment is:",
    options: ["Adenosine", "IV calcium", "Furosemide", "Diltiazem"],
    correctIndex: 1,
    explanation: "This is hyperkalemia with ECG changes; stabilize myocardium with calcium."
  },
  {
    id: 215, level: "Paramedic", category: "Cardiology",
    text: "A patient in AF with WPW (irregular wide-complex) should NOT receive:",
    options: ["Supportive care", "AV nodal blockers (e.g., diltiazem/verapamil) per protocol", "Procainamide (if allowed)", "Cardioversion if unstable"],
    correctIndex: 1,
    explanation: "AV nodal blockers can increase conduction through accessory pathway and cause VF."
  },
  {
    id: 216, level: "Paramedic", category: "Cardiology",
    text: "A patient has narrow-complex tachycardia and is stable but has a history of asthma. Vagal maneuvers are:",
    options: ["Only for VF", "Only for bradycardia", "Appropriate first attempt", "Contraindicated always"],
    correctIndex: 2,
    explanation: "Vagal maneuvers are noninvasive first-line for stable SVT."
  },
  {
    id: 217, level: "Paramedic", category: "Cardiology",
    text: "In cardiogenic shock (cool, clammy, hypotensive) the best general prehospital approach is:",
    options: ["Support airway, cautious fluids, and consider pressors per protocol", "Large fluid boluses without reassessment", "Diuretics immediately", "Nitroglycerin drip regardless of BP"],
    correctIndex: 0,
    explanation: "Cardiogenic shock needs support; too much fluid can worsen pulmonary edema."
  },
  {
    id: 218, level: "Paramedic", category: "Cardiology",
    text: "A patient has 3rd-degree AV block with hypotension. Best immediate therapy is:",
    options: ["Vagal maneuvers", "Transcutaneous pacing", "Nitroglycerin", "Adenosine"],
    correctIndex: 1,
    explanation: "Complete heart block with instability needs pacing."
  },
  {
    id: 219, level: "Paramedic", category: "Cardiology",
    text: "A post-ROSC patient has ETCO2 45 and is hypotensive. First priorities include:",
    options: ["Stop monitoring", "Give adenosine", "Optimize oxygenation/ventilation and support perfusion (fluids/pressors) per protocol", "Hyperventilate to ETCO2 20"],
    correctIndex: 2,
    explanation: "Post-ROSC care focuses on oxygenation, perfusion, and targeted temperature management where available."
  },
  {
    id: 220, level: "Paramedic", category: "Cardiology",
    text: "A patient with torsades de pointes (polymorphic VT with long QT) should receive:",
    options: ["Naloxone", "Adenosine", "Magnesium sulfate", "Diltiazem"],
    correctIndex: 2,
    explanation: "Magnesium is first-line for torsades; consider defib if unstable/pulseless."
  },
  {
    id: 221, level: "Paramedic", category: "Cardiology",
    text: "In an acute pulmonary edema patient with severe hypertension, best respiratory support is:",
    options: ["CPAP with appropriate meds per protocol", "Large fluid bolus", "Trendelenburg", "Naloxone"],
    correctIndex: 0,
    explanation: "CPAP improves oxygenation and reduces preload/afterload in CHF exacerbation."
  },
  {
    id: 222, level: "Paramedic", category: "Cardiology",
    text: "A patient has pericarditis-like pain that improves leaning forward. ECG may show:",
    options: ["Diffuse ST elevation (often)", "ST elevation in only one territory", "Peaked T waves", "No ECG changes ever"],
    correctIndex: 0,
    explanation: "Pericarditis often presents with diffuse ST elevation and positional pain."
  },
  {
    id: 223, level: "Paramedic", category: "Cardiology",
    text: "A patient's pacemaker spikes are present but no QRS follows. This is:",
    options: ["Failure to capture", "Ventricular fibrillation", "Failure to sense", "Normal pacing"],
    correctIndex: 0,
    explanation: "Spike without capture indicates the myocardium isn't depolarizing."
  },
  {
    id: 224, level: "Paramedic", category: "Cardiology",
    text: "A patient's pulse is 40 with dizziness after MI. If atropine fails, infusion options include:",
    options: ["Furosemide drip", "Nitroglycerin infusion to raise HR", "Epinephrine or dopamine infusion per protocol", "Adenosine infusion"],
    correctIndex: 2,
    explanation: "Pressor infusions support HR and BP when pacing/atropine insufficient."
  },
  {
    id: 225, level: "Paramedic", category: "Cardiology",
    text: "A patient with suspected STEMI is stable. The key prehospital action besides meds is:",
    options: ["Acquire 12-lead ECG and notify receiving facility early", "Give antibiotics", "Delay transport until pain is gone", "Do a full neurological exam first"],
    correctIndex: 0,
    explanation: "Early ECG/notification speeds reperfusion therapy."
  },

  // 4. Trauma
  {
    id: 226, level: "Paramedic", category: "Trauma",
    text: "A trauma patient has absent breath sounds on the right, hypotension, and JVD. Most likely cause is:",
    options: ["Asthma attack", "Pulmonary embolism", "Tension pneumothorax", "Simple rib fracture"],
    correctIndex: 2,
    explanation: "Trauma + JVD + hypotension + unilateral sounds suggests tension pneumothorax."
  },
  {
    id: 227, level: "Paramedic", category: "Trauma",
    text: "The best immediate treatment for tension pneumothorax in the field is:",
    options: ["Adenosine", "Needle decompression (per protocol) and rapid transport", "Oral glucose", "Diuretics"],
    correctIndex: 1,
    explanation: "Decompression relieves pressure to restore venous return and ventilation."
  },
  {
    id: 228, level: "Paramedic", category: "Trauma",
    text: "After needle decompression, the patient worsens again. Next step is:",
    options: ["Stop monitoring", "Reassess and consider repeat decompression/alternate site per protocol", "Apply a cervical collar only", "Give aspirin"],
    correctIndex: 1,
    explanation: "Needles can kink/clog; reassess and re-intervene as indicated."
  },
  {
    id: 229, level: "Paramedic", category: "Trauma",
    text: "A pelvic fracture with hypotension is suspected. Best immediate action is:",
    options: ["Have the patient stand", "Give nitroglycerin", "Rock the pelvis repeatedly", "Apply a pelvic binder/sheet and treat for shock"],
    correctIndex: 3,
    explanation: "Pelvic binding reduces hemorrhage by stabilizing pelvic volume."
  },
  {
    id: 230, level: "Paramedic", category: "Trauma",
    text: "A trauma patient has signs of hemorrhagic shock. The most effective intervention is:",
    options: ["Control bleeding (tourniquet/hemostatic) and rapid transport", "Delay transport for pain score", "Give aspirin", "Give furosemide"],
    correctIndex: 0,
    explanation: "Stopping hemorrhage and minimizing scene time saves lives."
  },
  {
    id: 231, level: "Paramedic", category: "Trauma",
    text: "A patient with penetrating chest trauma develops muffled heart sounds and hypotension. Suspect:",
    options: ["Heat exhaustion", "Spinal shock", "Cardiac tamponade", "Appendicitis"],
    correctIndex: 2,
    explanation: "Penetrating trauma can cause tamponade; rapid transport is critical."
  },
  {
    id: 232, level: "Paramedic", category: "Trauma",
    text: "In suspected traumatic brain injury, the most important early goal is to avoid:",
    options: ["Pain control", "Hypoxia and hypotension", "Immobilization", "Normal oxygen levels"],
    correctIndex: 1,
    explanation: "Even one episode of hypoxia/hypotension worsens TBI outcomes."
  },
  {
    id: 233, level: "Paramedic", category: "Trauma",
    text: "A TBI patient is intubated. Ventilation target is generally:",
    options: ["Hypoventilation to ETCO2 60", "Normocapnia (ETCO2 ~35-45) unless herniation signs", "No ETCO2 monitoring", "Routine hyperventilation to ETCO2 20"],
    correctIndex: 1,
    explanation: "Avoid hyperventilation except brief use for impending herniation per protocol."
  },
  {
    id: 234, level: "Paramedic", category: "Trauma",
    text: "A patient has an open femur fracture with severe bleeding. Best first action is:",
    options: ["Remove protruding bone", "Direct pressure/hemostatic dressings and tourniquet if needed", "Traction splint before bleeding control", "Give oral fluids"],
    correctIndex: 1,
    explanation: "Hemorrhage control takes priority; stabilize after bleeding is controlled."
  },
  {
    id: 235, level: "Paramedic", category: "Trauma",
    text: "A trauma patient has paradoxical chest movement and hypoxia. Best management is:",
    options: ["Provide ventilatory support and consider stabilization per protocol", "Give diuretics", "Force the patient to walk", "Give adenosine"],
    correctIndex: 0,
    explanation: "Flail chest can cause respiratory failure; support ventilation and rapid transport."
  },
  {
    id: 236, level: "Paramedic", category: "Trauma",
    text: "A patient has abdominal evisceration. You should:",
    options: ["Cover with moist sterile dressings and occlusive layer", "Apply ice directly", "Leave organs exposed to air", "Push organs back in"],
    correctIndex: 0,
    explanation: "Keep tissues moist/warm and protect with sterile dressings."
  },
  {
    id: 237, level: "Paramedic", category: "Trauma",
    text: "A patient has a partial amputation with heavy bleeding. Best care is:",
    options: ["Control bleeding, wrap the part in sterile moist gauze, cool it (not directly on ice), and transport", "Put the part directly on ice water", "Delay transport to clean the part", "Discard the part"],
    correctIndex: 0,
    explanation: "Proper preservation may allow reattachment; control hemorrhage first."
  },
  {
    id: 238, level: "Paramedic", category: "Trauma",
    text: "A patient has suspected crush injury after prolonged entrapment. The major life threat after release is:",
    options: ["Hyperkalemia and acidosis", "Dehydration only", "Hypoglycemia", "Hypertension only"],
    correctIndex: 0,
    explanation: "Crush syndrome releases potassium/myoglobin; treat and monitor per protocol."
  },
  {
    id: 239, level: "Paramedic", category: "Trauma",
    text: "For crush syndrome, early prehospital management often includes:",
    options: ["Aggressive fluids and ECG monitoring per protocol", "Diuretics immediately", "Adenosine", "Nitroglycerin"],
    correctIndex: 0,
    explanation: "Fluids help protect kidneys and support perfusion; monitor for hyperkalemia."
  },
  {
    id: 240, level: "Paramedic", category: "Trauma",
    text: "A patient has burns to face and neck with soot in mouth. Highest concern is:",
    options: ["Only mild pain", "Airway edema and inhalation injury", "Dehydration only", "A broken ankle"],
    correctIndex: 1,
    explanation: "Inhalation injury can rapidly obstruct airway; early airway planning is key."
  },
  {
    id: 241, level: "Paramedic", category: "Trauma",
    text: "A 25% TBSA burn patient is in shock. Prehospital fluid therapy should be:",
    options: ["No fluids ever", "Guided by protocol and perfusion signs; avoid over-resuscitation", "Large boluses without monitoring", "Diuretics"],
    correctIndex: 1,
    explanation: "Burn resuscitation requires careful balance; follow protocol and reassess."
  },
  {
    id: 242, level: "Paramedic", category: "Trauma",
    text: "A patient has a flaccid, warm limb with severe pain after fracture. Concern is for:",
    options: ["Simple muscle soreness", "Bronchitis", "Compartment syndrome", "Migraine"],
    correctIndex: 2,
    explanation: "Pain out of proportion with neurovascular compromise suggests compartment syndrome."
  },
  {
    id: 243, level: "Paramedic", category: "Trauma",
    text: "A patient has a penetrating object impaled in the thigh. You should:",
    options: ["Stabilize it in place and control bleeding", "Remove it immediately", "Ignore it and only splint", "Push it deeper"],
    correctIndex: 0,
    explanation: "Impaled objects can tamponade bleeding; stabilize and transport."
  },
  {
    id: 244, level: "Paramedic", category: "Trauma",
    text: "A patient has a suspected spinal injury and is hypotensive with bradycardia. This indicates:",
    options: ["Neurogenic shock", "Anxiety", "Hemorrhagic shock", "Septic shock"],
    correctIndex: 0,
    explanation: "Loss of sympathetic tone causes hypotension with bradycardia."
  },
  {
    id: 245, level: "Paramedic", category: "Trauma",
    text: "In hemorrhagic shock, the best indicator of adequate perfusion is:",
    options: ["Room temperature", "Mental status and pulse/skin trends (and BP/ETCO2 if available)", "Hair color", "Pain score only"],
    correctIndex: 1,
    explanation: "Perfusion is reflected in mentation and vital sign trends."
  },
  {
    id: 246, level: "Paramedic", category: "Trauma",
    text: "A trauma patient has unequal chest rise and severe respiratory distress. First action is to:",
    options: ["Delay oxygen until hospital", "Seal airway/ventilation issues and treat life threats per trauma sequence", "Do a detailed history first", "Give oral glucose"],
    correctIndex: 1,
    explanation: "Treat immediate life threats (airway/breathing/circulation) before detailed exam."
  },
  {
    id: 247, level: "Paramedic", category: "Trauma",
    text: "A patient has severe facial trauma and cannot be ventilated with BVM. Next best airway is:",
    options: ["Supraglottic airway or surgical airway per protocol", "Tourniquet", "Oral glucose", "Nasal cannula only"],
    correctIndex: 0,
    explanation: "If BVM fails, move up airway ladder per protocol."
  },
  {
    id: 248, level: "Paramedic", category: "Trauma",
    text: "A patient has traumatic amputated finger. The correct handling of the amputated part is to:",
    options: ["Wrap in moist sterile gauze, place in a bag, then place bag on ice (not directly on ice)", "Soak in water", "Put directly on ice", "Leave at room temperature"],
    correctIndex: 0,
    explanation: "Indirect cooling preserves tissue without freezing damage."
  },
  {
    id: 249, level: "Paramedic", category: "Trauma",
    text: "A patient with suspected internal bleeding has worsening hypotension. Best transport decision is:",
    options: ["Rapid transport to trauma center with early notification", "Transport to nearest urgent care", "Delay transport for pain meds first", "Stay on scene for full documentation"],
    correctIndex: 0,
    explanation: "Definitive care is surgical; minimize scene time and notify trauma center."
  },
  {
    id: 250, level: "Paramedic", category: "Trauma",
    text: "A tourniquet has been applied for life-threatening bleeding. You should:",
    options: ["Document the time applied and do not remove it in the field unless protocol directs", "Loosen it every 10 minutes", "Cover it so no one can see it", "Remove it once bleeding slows"],
    correctIndex: 0,
    explanation: "Tourniquets stay in place; document time and reassess for bleeding control."
  },

  // 5. Medical & OBGYN
  {
    id: 251, level: "Paramedic", category: "Medical & OBGYN",
    text: "A pregnant patient at 34 weeks is seizing and hypertensive. Most likely condition is:",
    options: ["Eclampsia", "Asthma attack", "Appendicitis", "Hypoglycemia only"],
    correctIndex: 0,
    explanation: "Seizure + pregnancy + hypertension suggests eclampsia."
  },
  {
    id: 252, level: "Paramedic", category: "Medical & OBGYN",
    text: "First-line medication to stop eclamptic seizures (after airway support) is:",
    options: ["Naloxone", "Magnesium sulfate (per protocol)", "Furosemide", "Adenosine"],
    correctIndex: 1,
    explanation: "Magnesium is first-line for eclampsia; benzos may be adjunct."
  },
  {
    id: 253, level: "Paramedic", category: "Medical & OBGYN",
    text: "A postpartum patient has heavy vaginal bleeding and a boggy uterus. Best initial action is:",
    options: ["Delay care until hospital", "Have the patient walk", "Fundal massage and treat for shock (per protocol)", "Give nitroglycerin"],
    correctIndex: 2,
    explanation: "Uterine atony causes hemorrhage; fundal massage helps contract the uterus."
  },
  {
    id: 254, level: "Paramedic", category: "Medical & OBGYN",
    text: "During delivery, the baby's head delivers but shoulders do not (turtle sign). This is:",
    options: ["Placenta previa", "Shoulder dystocia", "Breech presentation", "Prolapsed cord"],
    correctIndex: 1,
    explanation: "Shoulder dystocia requires specific maneuvers and rapid assistance."
  },
  {
    id: 255, level: "Paramedic", category: "Medical & OBGYN",
    text: "If the umbilical cord is prolapsed and you see it at the vaginal opening, you should:",
    options: ["Clamp and cut the cord immediately", "Relieve pressure off the cord and position mother (knee-chest) while rapid transport", "Push the cord back in", "Delay transport"],
    correctIndex: 1,
    explanation: "Prolapsed cord compromises fetal oxygenation; relieve compression and transport."
  },
  {
    id: 256, level: "Paramedic", category: "Medical & OBGYN",
    text: "A newborn is term, limp, and not breathing after drying/stimulation. Next step is:",
    options: ["Begin positive-pressure ventilation", "Give naloxone", "Give oral glucose", "Start chest compressions immediately"],
    correctIndex: 0,
    explanation: "Ventilation is the priority in neonatal resuscitation."
  },
  {
    id: 257, level: "Paramedic", category: "Medical & OBGYN",
    text: "A newborn has HR 50 despite effective ventilation. Next step is:",
    options: ["Start chest compressions with ventilation per NRP", "Give aspirin", "Stop ventilations", "Give adenosine"],
    correctIndex: 0,
    explanation: "If HR <60 after ventilation, start compressions and continue ventilation."
  },
  {
    id: 258, level: "Paramedic", category: "Medical & OBGYN",
    text: "A child has drooling, high fever, and tripod positioning. You should suspect:",
    options: ["Epiglottitis and avoid agitating the airway", "Anaphylaxis", "CHF", "Croup only"],
    correctIndex: 0,
    explanation: "Epiglottitis threatens airway; keep child calm and prepare for advanced airway."
  },
  {
    id: 259, level: "Paramedic", category: "Medical & OBGYN",
    text: "A child has barking cough and stridor that improves with cool night air. This is most consistent with:",
    options: ["Croup", "Epiglottitis", "CHF", "Anaphylaxis"],
    correctIndex: 0,
    explanation: "Croup causes upper-airway swelling with barking cough; keep calm and support."
  },
  {
    id: 260, level: "Paramedic", category: "Medical & OBGYN",
    text: "A patient has severe allergic reaction with hypotension and wheezing. Best medication is:",
    options: ["Diphenhydramine only", "Epinephrine IM (per protocol)", "Aspirin", "Furosemide"],
    correctIndex: 1,
    explanation: "Epinephrine treats airway edema/bronchospasm and raises BP; antihistamines are adjunct."
  },
  {
    id: 261, level: "Paramedic", category: "Medical & OBGYN",
    text: "A patient has status epilepticus (continuous seizures). First-line medication is typically:",
    options: ["Benzodiazepines (e.g., midazolam/lorazepam) per protocol", "Furosemide", "Nitroglycerin", "Adenosine"],
    correctIndex: 0,
    explanation: "Benzos stop active seizures; then treat cause and protect airway."
  },
  {
    id: 262, level: "Paramedic", category: "Medical & OBGYN",
    text: "A suspected opioid overdose patient is apneic. After ventilations, the medication is:",
    options: ["Aspirin", "Diltiazem", "Naloxone (per protocol)", "Magnesium sulfate"],
    correctIndex: 2,
    explanation: "Naloxone reverses opioid effects but does not replace ventilation."
  },
  {
    id: 263, level: "Paramedic", category: "Medical & OBGYN",
    text: "A patient has hypoglycemia and no IV access, but is unresponsive with a pulse. Best option is:",
    options: ["IM glucagon (per protocol) and ventilatory support if needed", "Oral glucose", "Furosemide", "Aspirin"],
    correctIndex: 0,
    explanation: "Oral glucose is unsafe without gag; glucagon can raise glucose when IV not available."
  },
  {
    id: 264, level: "Paramedic", category: "Medical & OBGYN",
    text: "A patient with suspected GI bleed is pale with coffee-ground emesis and hypotension. Prehospital priority is:",
    options: ["Induce vomiting", "Give aspirin", "Treat for shock and rapid transport", "Give nitroglycerin"],
    correctIndex: 2,
    explanation: "GI bleeding can be life-threatening; support perfusion and transport."
  },
  {
    id: 265, level: "Paramedic", category: "Medical & OBGYN",
    text: "A patient with severe COPD exacerbation has wheezing and fatigue. The best medication set is often:",
    options: ["Activated charcoal", "Bronchodilators, steroids, and oxygen/ventilation support per protocol", "Diuretics only", "Adenosine"],
    correctIndex: 1,
    explanation: "COPD exacerbations need bronchodilation and support; follow local protocol."
  },
  {
    id: 266, level: "Paramedic", category: "Medical & OBGYN",
    text: "A patient has acute pulmonary edema with severe respiratory distress. First-line respiratory intervention is:",
    options: ["Oral fluids", "CPAP if conscious and not contraindicated", "Trendelenburg", "High-dose opioids"],
    correctIndex: 1,
    explanation: "CPAP improves oxygenation and reduces work of breathing in CHF exacerbation."
  },
  {
    id: 267, level: "Paramedic", category: "Medical & OBGYN",
    text: "A patient is hypoventilating after benzodiazepine overdose. Prehospital priority is:",
    options: ["Airway and ventilatory support", "Flumazenil routinely", "Aspirin", "Nitroglycerin"],
    correctIndex: 0,
    explanation: "Support ventilation; flumazenil is not routine due to seizure risk in mixed overdoses."
  },
  {
    id: 268, level: "Paramedic", category: "Medical & OBGYN",
    text: "A patient has diabetic ketoacidosis signs and vomiting. Best transport position is:",
    options: ["Trendelenburg", "Position of comfort with airway protection and monitoring", "Prone without support", "Supine flat regardless of vomiting"],
    correctIndex: 1,
    explanation: "Protect airway, prevent aspiration, and monitor closely."
  },
  {
    id: 269, level: "Paramedic", category: "Medical & OBGYN",
    text: "A patient has suspected meningitis with fever, rash, and altered mental status. Best action is to:",
    options: ["Delay care to get full history", "Use PPE, support ABCs, and transport rapidly", "Induce vomiting", "Give aspirin"],
    correctIndex: 1,
    explanation: "Severe infection requires rapid evaluation; protect crew with appropriate precautions."
  },
  {
    id: 270, level: "Paramedic", category: "Medical & OBGYN",
    text: "A patient has severe abdominal pain and a pulsatile mass. Suspect:",
    options: ["Abdominal aortic aneurysm", "Asthma", "Kidney stone only", "Appendicitis"],
    correctIndex: 0,
    explanation: "Pulsatile abdominal mass with pain suggests AAA; rapid transport."
  },
  {
    id: 271, level: "Paramedic", category: "Medical & OBGYN",
    text: "A patient with renal failure missed dialysis and has weakness. ECG shows peaked T waves. Best first medication is:",
    options: ["IV calcium (per protocol)", "Adenosine", "Furosemide", "Diltiazem"],
    correctIndex: 0,
    explanation: "Treat life-threatening hyperkalemia effects on the heart first."
  },
  {
    id: 272, level: "Paramedic", category: "Medical & OBGYN",
    text: "A patient is vomiting, has pinpoint pupils, and bradycardia after opioid use. If naloxone is given, the goal is:",
    options: ["Restore adequate breathing, not full arousal", "Treat pain completely", "Make the patient fully awake immediately", "Lower blood pressure"],
    correctIndex: 0,
    explanation: "Titrate to adequate ventilation to avoid violent withdrawal and vomiting."
  },
  {
    id: 273, level: "Paramedic", category: "Medical & OBGYN",
    text: "A patient with asthma receives albuterol but is still tight with poor air movement. Next step may include:",
    options: ["Add ipratropium and consider epinephrine/advanced airway per protocol", "Stop oxygen", "Give aspirin", "Give furosemide"],
    correctIndex: 0,
    explanation: "Severe bronchospasm may require escalation; follow protocol."
  },
  {
    id: 274, level: "Paramedic", category: "Medical & OBGYN",
    text: "A patient has severe vomiting/diarrhea and signs of dehydration. Best fluid choice is often:",
    options: ["Nitroglycerin drip", "Isotonic crystalloid bolus (per protocol)", "Hypertonic saline routinely", "Dextrose only"],
    correctIndex: 1,
    explanation: "Volume depletion responds to isotonic fluids; reassess frequently."
  },
  {
    id: 275, level: "Paramedic", category: "Medical & OBGYN",
    text: "A patient with sickle cell crisis has severe pain and hypoxia. Best management includes:",
    options: ["Adenosine", "Oxygen if hypoxic, analgesia per protocol, and transport", "Tourniquet application", "Diuretics"],
    correctIndex: 1,
    explanation: "Treat hypoxia and pain; definitive care is hospital-based."
  },

  // 6. EMS Operations
  {
    id: 276, level: "Paramedic", category: "EMS Operations",
    text: "In Incident Command System (ICS), the Safety Officer reports directly to the:",
    options: ["Public Information Officer", "Incident Commander", "Planning Section Chief", "Operations Section Chief"],
    correctIndex: 1,
    explanation: "Safety is Command Staff and reports to the IC."
  },
  {
    id: 277, level: "Paramedic", category: "EMS Operations",
    text: "The primary purpose of medical direction is to:",
    options: ["Eliminate documentation", "Provide clinical oversight through protocols and on-line consultation", "Allow treatment outside scope without approval", "Replace local laws"],
    correctIndex: 1,
    explanation: "Medical direction guides care within scope and protocol."
  },
  {
    id: 278, level: "Paramedic", category: "EMS Operations",
    text: "A paramedic makes a medication error. The best immediate action is to:",
    options: ["Assess the patient, treat adverse effects, and notify medical control/supervisor per policy", "Wait until end of shift to mention it", "Hide the error", "Blame the patient"],
    correctIndex: 0,
    explanation: "Patient safety first; report per policy and document objectively."
  },
  {
    id: 279, level: "Paramedic", category: "EMS Operations",
    text: "Quality improvement (QI) in EMS is designed to:",
    options: ["Improve patient care through review and feedback", "Avoid training", "Punish providers only", "Reduce documentation"],
    correctIndex: 0,
    explanation: "QI identifies system issues and supports improvement."
  },
  {
    id: 280, level: "Paramedic", category: "EMS Operations",
    text: "Standing orders are:",
    options: ["Preapproved protocols allowing treatment without contacting a physician each time", "Only verbal orders", "Illegal without a doctor on scene", "Only for BLS providers"],
    correctIndex: 0,
    explanation: "Standing orders are written medical direction."
  },
  {
    id: 281, level: "Paramedic", category: "EMS Operations",
    text: "The best practice for controlled substances accountability is:",
    options: ["Strict count, secure storage, and documented chain of custody", "Leaving narcotics unlocked", "Sharing vials between crews", "Documenting only if asked"],
    correctIndex: 0,
    explanation: "Controlled substances require secure handling and accurate logs."
  },
  {
    id: 282, level: "Paramedic", category: "EMS Operations",
    text: "When giving a patient report to the ED, the most useful format is:",
    options: ["A long story with opinions", "A concise structured handoff (e.g., SBAR/MIST) with key times", "Only demographics", "Only the ECG strip"],
    correctIndex: 1,
    explanation: "Structured handoffs reduce omissions and errors."
  },
  {
    id: 283, level: "Paramedic", category: "EMS Operations",
    text: "In an MCI, the Treatment Unit Leader is typically within the:",
    options: ["Planning Section only", "Command Staff", "Operations Section", "Finance Section"],
    correctIndex: 2,
    explanation: "Triage/treatment/transport are Operations functions."
  },
  {
    id: 284, level: "Paramedic", category: "EMS Operations",
    text: "JumpSTART triage is designed for:",
    options: ["HazMat identification", "Stroke assessment", "Pediatric mass-casualty triage", "Burn assessment"],
    correctIndex: 2,
    explanation: "JumpSTART adapts triage to pediatric physiology."
  },
  {
    id: 285, level: "Paramedic", category: "EMS Operations",
    text: "In START triage, a patient who is not breathing after airway opening is tagged:",
    options: ["Minor (green)", "Immediate (red)", "Deceased/expectant (black) per START", "Delayed (yellow)"],
    correctIndex: 2,
    explanation: "If not breathing after airway repositioning, START tags as deceased."
  },
  {
    id: 286, level: "Paramedic", category: "EMS Operations",
    text: "A key element of crew resource management (CRM) is:",
    options: ["Closed-loop communication and task delegation", "Silence to avoid conflict", "One-person decision making always", "Ignoring checklists"],
    correctIndex: 0,
    explanation: "CRM reduces errors through communication and teamwork."
  },
  {
    id: 287, level: "Paramedic", category: "EMS Operations",
    text: "If you suspect your partner is impaired on duty, you should:",
    options: ["Ignore it", "Follow agency policy and remove them from patient care", "Let them 'sleep it off' during calls", "Post about it online"],
    correctIndex: 1,
    explanation: "Impairment risks patient safety; follow reporting procedures."
  },
  {
    id: 288, level: "Paramedic", category: "EMS Operations",
    text: "The most defensible documentation is:",
    options: ["Accurate, objective, timely, and complete", "Short and vague", "Based on memory days later", "Filled with opinions"],
    correctIndex: 0,
    explanation: "Objective facts and times improve legal defensibility."
  },
  {
    id: 289, level: "Paramedic", category: "EMS Operations",
    text: "A patient is incompetent and needs lifesaving care. Consent is:",
    options: ["Required in writing", "Implied by emergency doctrine", "Never allowed", "Only allowed if family is present"],
    correctIndex: 1,
    explanation: "Emergent care is allowed when patient can't consent."
  },
  {
    id: 290, level: "Paramedic", category: "EMS Operations",
    text: "A paramedic should practice within:",
    options: ["Any procedure seen online", "Only what the patient requests", "Scope of practice and local protocols", "Only what is easiest"],
    correctIndex: 2,
    explanation: "Scope and protocols define legal practice boundaries."
  },
  {
    id: 291, level: "Paramedic", category: "EMS Operations",
    text: "Medical oversight provided retrospectively through chart review is called:",
    options: ["ICS", "Off-line medical direction", "On-line medical direction", "Abandonment"],
    correctIndex: 1,
    explanation: "Off-line includes protocols, training, QA/QI, and case review."
  },
  {
    id: 292, level: "Paramedic", category: "EMS Operations",
    text: "If a patient refuses care, the most important assessment is:",
    options: ["Decision-making capacity", "Body temperature only", "Insurance status", "Pain score"],
    correctIndex: 0,
    explanation: "Capacity determines validity of refusal and informs next steps."
  },
  {
    id: 293, level: "Paramedic", category: "EMS Operations",
    text: "A patient is combative and poses danger. The safest approach is to:",
    options: ["Use de-escalation and request law enforcement assistance; restrain per protocol if needed", "Ignore crew safety", "Fight the patient alone", "Immediately sedate without assessment"],
    correctIndex: 0,
    explanation: "Safety first; use de-escalation, assistance, and protocol-based restraint."
  },
  {
    id: 294, level: "Paramedic", category: "EMS Operations",
    text: "When documenting use of restraints, you must include:",
    options: ["Reason, type, monitoring, and patient response", "Only that you used them", "Nothing if it was quick", "No vitals required"],
    correctIndex: 0,
    explanation: "Restraint documentation must show medical necessity and monitoring."
  },
  {
    id: 295, level: "Paramedic", category: "EMS Operations",
    text: "Termination of resuscitation decisions should be:",
    options: ["Based on provider fatigue", "Based on local protocol and medical control when required", "Based on family preference only", "Never allowed prehospital"],
    correctIndex: 1,
    explanation: "Follow TOR protocols and consult medical control as required."
  },
  {
    id: 296, level: "Paramedic", category: "EMS Operations",
    text: "When transporting a STEMI patient, your best system action is to:",
    options: ["Transmit/notify early to activate cath lab", "Wait until arrival to tell the ED", "Stop for nonessential procedures", "Delay transport for more vitals"],
    correctIndex: 0,
    explanation: "Early activation reduces time to reperfusion."
  },
  {
    id: 297, level: "Paramedic", category: "EMS Operations",
    text: "A medication order is unclear. The safest action is to:",
    options: ["Ask the patient to decide", "Clarify with medical control before administration", "Guess based on experience", "Skip documentation"],
    correctIndex: 1,
    explanation: "Never administer unclear orders; clarify first."
  },
  {
    id: 298, level: "Paramedic", category: "EMS Operations",
    text: "The best way to reduce ambulance crash risk is to:",
    options: ["Drive with due regard, slow at intersections, and use seat belts", "Turn off lights at night", "Use sirens at maximum always", "Drive faster to reduce time"],
    correctIndex: 0,
    explanation: "Most serious crashes occur at intersections; due regard saves lives."
  },
  {
    id: 299, level: "Paramedic", category: "EMS Operations",
    text: "A paramedic witnesses a colleague falsifying a PCR. Best action is to:",
    options: ["Edit their chart for them", "Report through appropriate chain and preserve integrity of records", "Ignore it", "Post about it"],
    correctIndex: 1,
    explanation: "Falsification is serious and must be reported per policy."
  },
  {
    id: 300, level: "Paramedic", category: "EMS Operations",
    text: "The purpose of protocols for high-risk/low-frequency procedures is to:",
    options: ["Standardize care and reduce errors under stress", "Allow improvisation", "Replace training", "Slow down all calls unnecessarily"],
    correctIndex: 0,
    explanation: "Standardization improves safety and outcomes."
  },
    // ===== NEXT 300 QUESTIONS (IDs 301–600) =====

  // ================= EMT CATEGORIES =================

  // 1) Patient Treatment (EMT) — 301–330
  { id: 301, level: "EMT", category: "Patient Treatment", text: "A conscious adult is choking and cannot speak or cough effectively. You should:", options: ["Give sips of water", "Do a blind finger sweep", "Begin chest compressions", "Give back blows", "Perform abdominal thrusts"], correctIndex: 4, explanation: "Severe airway obstruction in a conscious adult is treated with abdominal thrusts until relieved or the patient becomes unresponsive." },
  { id: 302, level: "EMT", category: "Patient Treatment", text: "A 6-year-old has hives, wheezing, and lip swelling after peanut exposure. Best initial EMT treatment is:", options: ["Diphenhydramine only", "Oral glucose", "Nebulized albuterol only", "Assist with prescribed epinephrine auto-injector", "Cold pack to the lips"], correctIndex: 3, explanation: "Anaphylaxis with airway/breathing involvement requires epinephrine (assist with auto-injector per protocol) and rapid transport." },
  { id: 303, level: "EMT", category: "Patient Treatment", text: "A diabetic patient is alert but confused, diaphoretic, and can swallow. Your best immediate intervention is:", options: ["Insulin injection", "Water only", "Oral glucose", "Oxygen via NRB regardless of SpO2", "Ventilate with BVM"], correctIndex: 2, explanation: "If hypoglycemia is suspected and the patient can swallow, give oral glucose per protocol." },
  { id: 304, level: "EMT", category: "Patient Treatment", text: "A patient with suspected opioid overdose is breathing 6/min with shallow respirations. First priority is:", options: ["Naloxone first", "IV fluids", "Pain control", "Ventilate with BVM and high-flow oxygen", "Place in recovery position only"], correctIndex: 3, explanation: "Airway and ventilation come first; provide BVM ventilations, then administer naloxone per protocol." },
  { id: 305, level: "EMT", category: "Patient Treatment", text: "For severe external bleeding from an extremity, the most effective immediate control is:", options: ["Elevation only", "Ice pack", "Tourniquet 6 inches distal to wound", "Pressure points only", "Direct pressure; apply tourniquet if not controlled"], correctIndex: 4, explanation: "Start with direct pressure; if life-threatening bleeding persists, apply a tourniquet 2–3 inches above the wound (not over a joint) per protocol." },
  { id: 306, level: "EMT", category: "Patient Treatment", text: "A patient has a partial-thickness burn covering the forearm. Best field care is:", options: ["Apply butter/ointment", "Break blisters", "Cover with dry sterile dressing after cooling", "Apply ice directly for 20 minutes", "Scrub the burn clean"], correctIndex: 2, explanation: "Cool with clean water briefly, then cover with a dry sterile dressing; do not apply ointments or break blisters." },
  { id: 307, level: "EMT", category: "Patient Treatment", text: "A patient with suspected spinal injury vomits while supine. Best action is:", options: ["Remove c-collar", "Sit the patient upright", "Log roll as a unit to clear the airway", "Give antiemetic", "Ignore vomiting if breathing"], correctIndex: 2, explanation: "Protect the airway: log roll the patient as a unit (spinal motion restriction) to allow drainage/suction." },
  { id: 308, level: "EMT", category: "Patient Treatment", text: "A patient with chest pain has no aspirin allergy and no GI bleeding history. EMT should:", options: ["Withhold aspirin if pain is severe", "Give ibuprofen instead", "Assist with nitro first regardless of BP", "Administer/assist chewable aspirin per protocol", "Delay aspirin until hospital ECG"], correctIndex: 3, explanation: "Early aspirin (typically 160–324 mg chewable) reduces platelet aggregation in suspected ACS when not contraindicated." },
  { id: 309, level: "EMT", category: "Patient Treatment", text: "A patient has a femur fracture with signs of shock. Most appropriate priority is:", options: ["Splint later; transport first without stabilization", "Give oral fluids", "Apply heat pack to the thigh", "Control bleeding, splint/immobilize, treat shock, rapid transport", "Massage the leg to reduce spasm"], correctIndex: 3, explanation: "Manage life threats (bleeding/shock), immobilize to reduce pain/bleeding, keep warm, and transport rapidly." },
  { id: 310, level: "EMT", category: "Patient Treatment", text: "A child has croup with stridor at rest but is awake and maintaining airway. Best oxygen approach is:", options: ["Force NRB tightly", "BVM ventilations immediately", "Cool mist/keep child calm and give blow-by oxygen", "Place supine", "Give oral glucose"], correctIndex: 2, explanation: "Croup improves with calm, minimal agitation, and gentle blow-by oxygen; avoid distressing the child." },
  { id: 311, level: "EMT", category: "Patient Treatment", text: "A patient with a suspected stroke has SpO2 97% and normal work of breathing. Oxygen should be:", options: ["High-flow NRB always", "Withheld only if cyanotic", "Titrated; no routine oxygen if adequately oxygenated", "Given via nasal cannula at 6 L/min regardless", "Given only after aspirin"], correctIndex: 2, explanation: "Routine high-flow oxygen is not indicated when oxygenation is adequate; maintain normal SpO2 per protocol." },
  { id: 312, level: "EMT", category: "Patient Treatment", text: "A patient is actively seizing. The best EMT action is:", options: ["Restrain limbs", "Put an object in the mouth", "Give oral glucose during seizure", "Protect from injury, maintain airway, suction as needed, time the seizure", "Immediately start CPR"], correctIndex: 3, explanation: "Do not restrain or place objects in the mouth; protect from injury, manage airway, and monitor." },
  { id: 313, level: "EMT", category: "Patient Treatment", text: "A patient with asthma has wheezing and increased work of breathing. They have a prescribed inhaler. EMT should:", options: ["Tell them to stop using it", "Assist with prescribed bronchodilator per protocol", "Give antibiotics", "Give nitroglycerin", "Perform abdominal thrusts"], correctIndex: 1, explanation: "Assisting with a prescribed bronchodilator is appropriate for bronchospasm if not contraindicated and per local protocol." },
  { id: 314, level: "EMT", category: "Patient Treatment", text: "You suspect heat stroke: hot skin and altered mental status. Best immediate actions include:", options: ["Warm blankets and hot packs", "Rapid active cooling and rapid transport", "Give aspirin for fever", "Delay transport until temperature normalizes", "Offer oral fluids only"], correctIndex: 1, explanation: "Heat stroke is life-threatening; begin active cooling (as feasible) and transport rapidly." },
  { id: 315, level: "EMT", category: "Patient Treatment", text: "A patient with hypothermia is found cold and confused. Best handling is:", options: ["Rough handling to stimulate", "Encourage brisk walking", "Gentle handling, remove wet clothing, warm gradually, transport", "Give alcohol to warm up", "Rapid rubbing of extremities"], correctIndex: 2, explanation: "Handle gently (risk of dysrhythmias), prevent further heat loss, warm gradually, and transport." },
  { id: 316, level: "EMT", category: "Patient Treatment", text: "A patient with suspected poisoning has an empty pill bottle and is becoming drowsy. Best EMT action is:", options: ["Induce vomiting", "Give activated charcoal without direction", "Contact poison control/medical direction and support ABCs", "Give water and wait", "Delay transport to search the home"], correctIndex: 2, explanation: "Support airway/breathing/circulation and consult poison control/medical direction; do not induce vomiting." },
  { id: 317, level: "EMT", category: "Patient Treatment", text: "A patient with suspected tension pneumothorax is deteriorating. As an EMT, your priority is:", options: ["Needle decompression", "Hyperventilate aggressively to 30/min", "Rapid transport and supportive ventilation/oxygen per protocol", "Give oral fluids", "Withhold oxygen to prevent suppression"], correctIndex: 2, explanation: "EMTs typically provide supportive care (oxygen/ventilation) and rapid transport; advanced decompression is provider-dependent." },
  { id: 318, level: "EMT", category: "Patient Treatment", text: "A patient has a nosebleed without trauma and normal vitals. Best care is:", options: ["Tilt head back", "Pack tightly into throat", "Pinch nostrils and lean forward", "Lay supine", "Give aspirin"], correctIndex: 2, explanation: "Lean forward and pinch the nostrils to reduce bleeding and prevent aspiration." },
  { id: 319, level: "EMT", category: "Patient Treatment", text: "A patient has an amputated finger. Best care for the amputated part is:", options: ["Place directly on ice", "Rinse and throw away", "Wrap in moist sterile gauze, place in bag, keep bag cool", "Scrub with antiseptic and leave uncovered", "Reattach with tape"], correctIndex: 2, explanation: "Protect the part (moist sterile wrap), seal in a bag, and cool indirectly; do not freeze." },
  { id: 320, level: "EMT", category: "Patient Treatment", text: "A patient with suspected CHF has severe dyspnea and crackles. Most appropriate initial oxygen delivery is:", options: ["Room air only", "Nasal cannula regardless of distress", "NRB or CPAP if available/indicated per protocol", "Paper bag breathing", "Oral glucose"], correctIndex: 2, explanation: "Provide high-concentration oxygen; CPAP (if trained/allowed) helps in pulmonary edema when the patient is conscious and cooperative." },
  { id: 321, level: "EMT", category: "Patient Treatment", text: "When applying a tourniquet for uncontrolled extremity bleeding, you should:", options: ["Loosen it every 10 minutes", "Place it over the wound", "Place it 2–3 inches above wound and tighten until bleeding stops", "Apply below the joint", "Use it only after 30 minutes of pressure"], correctIndex: 2, explanation: "Apply proximal to the wound (not over a joint) and tighten until bleeding stops; do not periodically loosen." },
  { id: 322, level: "EMT", category: "Patient Treatment", text: "A patient has a chemical splash to the eye. Best immediate care is:", options: ["Cover both eyes and transport", "Neutralize with vinegar", "Irrigate continuously with water/saline while transporting", "Apply ointment", "Patch only the affected eye"], correctIndex: 2, explanation: "Immediate continuous irrigation is the priority for chemical eye exposure." },
  { id: 323, level: "EMT", category: "Patient Treatment", text: "A patient with chest pain took sildenafil (Viagra) earlier today. They request nitroglycerin. You should:", options: ["Assist with nitro if pain is severe", "Give double-dose nitro", "Withhold nitro and contact medical direction", "Have them walk it off", "Give oral glucose"], correctIndex: 2, explanation: "PDE-5 inhibitors plus nitroglycerin can cause profound hypotension; nitro is contraindicated within the recommended timeframe." },
  { id: 324, level: "EMT", category: "Patient Treatment", text: "A patient with a dislocated shoulder has intact distal pulse and sensation. Best EMT action is:", options: ["Attempt reduction immediately", "Force the arm into place", "Immobilize in position found and transport", "Apply traction splint", "Massage and rotate the joint"], correctIndex: 2, explanation: "EMTs generally immobilize and transport; reduction is not typically performed in the field at EMT level." },
  { id: 325, level: "EMT", category: "Patient Treatment", text: "A patient is in shock with cool clammy skin and tachycardia after trauma. Best positioning is:", options: ["Sitting upright", "Prone", "Supine (if tolerated) and keep warm", "Trendelenburg always", "Walk the patient to ambulance"], correctIndex: 2, explanation: "Treat shock with supine positioning (as tolerated), temperature control, oxygen as needed, and rapid transport." },
  { id: 326, level: "EMT", category: "Patient Treatment", text: "A child is coughing strongly after choking on food. You should:", options: ["Begin abdominal thrusts immediately", "Give back blows", "Encourage continued coughing and monitor", "Do a blind finger sweep", "Start CPR"], correctIndex: 2, explanation: "If the patient can cough effectively, do not interfere; monitor and be ready if it becomes ineffective." },
  { id: 327, level: "EMT", category: "Patient Treatment", text: "A patient with suspected MI is pale and nauseated. Which intervention is most appropriate if no contraindications?", options: ["Chewable aspirin", "Oral glucose", "Ibuprofen", "Albuterol", "Activated charcoal"], correctIndex: 0, explanation: "Aspirin is a key early intervention for suspected ACS when not contraindicated." },
  { id: 328, level: "EMT", category: "Patient Treatment", text: "A patient with suspected stroke has sudden facial droop and arm drift. The most important prehospital action is:", options: ["Give aspirin immediately", "Delay transport to reassess hourly", "Rapid transport to a stroke-capable center with pre-notification", "Give nitroglycerin", "Administer oral glucose regardless"], correctIndex: 2, explanation: "Stroke care is time-dependent; rapid transport and pre-notification improve access to definitive therapy." },
  { id: 329, level: "EMT", category: "Patient Treatment", text: "A patient is apneic with a pulse. Best ventilation rate for an adult with BVM is approximately:", options: ["20–30/min", "1 breath every 1 second", "1 breath every 6 seconds", "1 breath every 2 seconds", "No ventilations if pulse present"], correctIndex: 2, explanation: "For adult respiratory arrest with a pulse, ventilate about 1 breath every 6 seconds (10/min), avoiding hyperventilation." },
  { id: 330, level: "EMT", category: "Patient Treatment", text: "A patient has suspected overdose and is unresponsive but breathing adequately. Naloxone use should be:", options: ["Avoided always", "Given only after intubation", "Considered per protocol while monitoring airway", "Given by mouth", "Given as a continuous IV infusion by EMT"], correctIndex: 2, explanation: "If permitted, naloxone may be used, but airway monitoring and support remain the priority." },

  // 2) Primary Assessment (EMT) — 331–360
  { id: 331, level: "EMT", category: "Primary Assessment", text: "In the primary assessment, the first step after ensuring scene safety is to:", options: ["Obtain SAMPLE history", "Check pupils", "Form a general impression and assess responsiveness", "Auscultate lung sounds", "Take a full set of vitals"], correctIndex: 2, explanation: "Primary assessment begins with general impression/level of responsiveness to identify immediate life threats." },
  { id: 332, level: "EMT", category: "Primary Assessment", text: "A patient has noisy gurgling respirations. Your next action is:", options: ["Give oral glucose", "Insert NPA immediately", "Suction the airway", "Check blood pressure", "Apply a splint"], correctIndex: 2, explanation: "Gurgling suggests fluid in the airway; suction to clear the airway before adjuncts/ventilation." },
  { id: 333, level: "EMT", category: "Primary Assessment", text: "A patient is unresponsive with no normal breathing. You check the carotid pulse for no more than:", options: ["2 seconds", "30 seconds", "5 seconds", "10 seconds", "20 seconds"], correctIndex: 3, explanation: "Assess pulse (and breathing) quickly; if no pulse within 10 seconds, begin CPR." },
  { id: 334, level: "EMT", category: "Primary Assessment", text: "A patient is responsive to painful stimuli only. This indicates which AVPU level?", options: ["Alert", "Verbal", "Pain", "Unresponsive", "Oriented"], correctIndex: 2, explanation: "AVPU: Alert, responds to Verbal, responds to Pain, Unresponsive." },
  { id: 335, level: "EMT", category: "Primary Assessment", text: "The best sign that ventilations are effective is:", options: ["Pink nail beds", "High pulse rate", "Chest rise and fall with each ventilation", "Loud breath sounds over the stomach", "Coughing during ventilations"], correctIndex: 2, explanation: "Visible chest rise indicates air is entering the lungs; avoid gastric insufflation." },
  { id: 336, level: "EMT", category: "Primary Assessment", text: "In an adult with suspected airway obstruction, which finding suggests complete obstruction?", options: ["Strong cough", "Able to speak", "High-pitched wheeze", "Silent inability to speak/cough", "Normal skin color"], correctIndex: 3, explanation: "Inability to speak/cough with no air movement indicates severe/complete obstruction." },
  { id: 337, level: "EMT", category: "Primary Assessment", text: "A patient has snoring respirations. The most appropriate initial action is:", options: ["Place NPA first", "Suction immediately", "Open airway with head-tilt chin-lift or jaw-thrust if trauma", "Administer aspirin", "Apply CPAP"], correctIndex: 2, explanation: "Snoring suggests tongue obstruction; open the airway (jaw-thrust if trauma suspected)." },
  { id: 338, level: "EMT", category: "Primary Assessment", text: "A patient with suspected trauma is unresponsive. Best airway opening maneuver is:", options: ["Head-tilt chin-lift", "Modified jaw thrust", "Abdominal thrusts", "Tongue pull", "Valsalva maneuver"], correctIndex: 1, explanation: "Use a jaw-thrust (with spinal precautions) in suspected trauma to reduce cervical movement." },
  { id: 339, level: "EMT", category: "Primary Assessment", text: "Which patient should be categorized as high priority for rapid transport?", options: ["Minor ankle sprain", "Isolated small laceration", "Stable patient with mild headache", "Altered mental status with hypotension", "Chronic back pain for 3 months"], correctIndex: 3, explanation: "Altered mental status and hypotension suggest shock/critical illness requiring rapid transport." },
  { id: 340, level: "EMT", category: "Primary Assessment", text: "You find severe bleeding from the thigh. In the primary assessment, bleeding control should occur:", options: ["After full head-to-toe", "After SAMPLE", "After lung sounds", "Immediately (before detailed assessment)", "Only after ALS arrives"], correctIndex: 3, explanation: "Life-threatening external hemorrhage is controlled immediately during primary assessment." },
  { id: 341, level: "EMT", category: "Primary Assessment", text: "For an adult with respiratory distress and adequate breathing, the best initial oxygen device is typically:", options: ["No oxygen ever", "NRB (or titrated oxygen) based on SpO2 and distress", "BVM regardless of breathing", "Tracheostomy tube", "Oral airway"], correctIndex: 1, explanation: "Choose oxygen delivery based on work of breathing and oxygenation; use NRB for significant distress/hypoxia, titrate per protocol." },
  { id: 342, level: "EMT", category: "Primary Assessment", text: "A patient has absent radial pulses and cool pale skin. This most strongly suggests:", options: ["Normal perfusion", "Hypertension", "Poor perfusion/shock", "Hyperglycemia", "Stable condition"], correctIndex: 2, explanation: "Weak/absent peripheral pulses with pale cool skin indicates poor perfusion (possible shock)." },
  { id: 343, level: "EMT", category: "Primary Assessment", text: "In the primary assessment, you determine breathing is inadequate. Your next action is:", options: ["Take temperature", "Assist ventilations with BVM", "Perform detailed neuro exam", "Get full medical history first", "Start splinting"], correctIndex: 1, explanation: "Inadequate breathing is an immediate life threat; provide ventilatory support with BVM." },
  { id: 344, level: "EMT", category: "Primary Assessment", text: "A patient is responsive but confused and cannot answer questions appropriately. This is best described as:", options: ["A&O x4", "Oriented to person only", "Altered mental status", "Normal mentation", "Unresponsive"], correctIndex: 2, explanation: "Inability to think clearly/answer appropriately indicates altered mental status." },
  { id: 345, level: "EMT", category: "Primary Assessment", text: "In an unresponsive patient without gag reflex, the best airway adjunct is:", options: ["NPA only", "OPA", "No adjuncts allowed", "Mouth-to-mouth only", "Oral glucose"], correctIndex: 1, explanation: "An OPA is used in unresponsive patients without a gag reflex to help maintain airway patency." },
  { id: 346, level: "EMT", category: "Primary Assessment", text: "A semi-conscious patient with a suspected basilar skull fracture needs an airway adjunct. Best choice is:", options: ["OPA", "NPA avoided; consider positioning/suction and basic airway management per protocol", "Blind finger sweep", "Nasogastric tube", "No airway management"], correctIndex: 1, explanation: "Suspected basilar skull fracture is a contraindication to NPA; manage airway with positioning/suction and BVM as needed." },
  { id: 347, level: "EMT", category: "Primary Assessment", text: "The quickest way to assess circulatory status in an adult is:", options: ["Capillary refill only", "Blood sugar", "Radial pulse and skin signs", "Temperature and pupils", "Lung sounds"], correctIndex: 2, explanation: "Pulse presence/quality and skin color/temperature/moisture rapidly indicate perfusion." },
  { id: 348, level: "EMT", category: "Primary Assessment", text: "Which is the best immediate action for a patient in respiratory failure with cyanosis and minimal chest rise?", options: ["Encourage slow breathing", "Apply nasal cannula", "BVM ventilations with high-flow oxygen", "Give aspirin", "Put in a paper bag"], correctIndex: 2, explanation: "Respiratory failure requires assisted ventilations; a nasal cannula is insufficient." },
  { id: 349, level: "EMT", category: "Primary Assessment", text: "A patient is alert, speaking full sentences, RR 18, SpO2 99%, skin warm/dry. Priority is:", options: ["Immediate CPR", "Rapid transport with lights/sirens", "Routine assessment and transport as needed", "Needle decompression", "Defibrillate"], correctIndex: 2, explanation: "No immediate life threats; proceed with focused assessment and appropriate transport." },
  { id: 350, level: "EMT", category: "Primary Assessment", text: "A child has respiratory distress with suprasternal retractions and nasal flaring. This indicates:", options: ["Normal breathing", "Severe increased work of breathing", "Only anxiety", "Low blood sugar", "Stable airway"], correctIndex: 1, explanation: "Retractions and nasal flaring are signs of significant respiratory effort in children." },
  { id: 351, level: "EMT", category: "Primary Assessment", text: "You suspect shock. Which skin finding supports this most?", options: ["Warm, dry, pink", "Cool, pale, clammy", "Flushed and sweaty after exercise", "Sunburn only", "Localized rash"], correctIndex: 1, explanation: "Cool, pale, clammy skin is a classic sign of poor perfusion/shock." },
  { id: 352, level: "EMT", category: "Primary Assessment", text: "In a trauma patient, the single most important time-saving concept is:", options: ["Prolonged on-scene splinting", "Rapid extrication and transport when indicated", "Waiting for family consent", "Detailed history on scene", "Full head-to-toe before moving"], correctIndex: 1, explanation: "When critical trauma is suspected, minimize scene time and transport rapidly." },
  { id: 353, level: "EMT", category: "Primary Assessment", text: "You see severe facial trauma with bleeding into the mouth and ineffective breathing. Best initial action is:", options: ["Insert OPA first", "Suction and open airway, then ventilate as needed", "Give aspirin", "Administer oral glucose", "Apply CPAP"], correctIndex: 1, explanation: "Clear the airway (suction), open it, then provide ventilations if needed." },
  { id: 354, level: "EMT", category: "Primary Assessment", text: "A patient answers questions but is confused about time and place. They are best described as:", options: ["A&O x4", "A&O x3", "A&O x1–2 (not fully oriented)", "Unresponsive", "Normal mentation"], correctIndex: 2, explanation: "Orientation requires person, place, time, and event; missing elements indicates altered mentation." },
  { id: 355, level: "EMT", category: "Primary Assessment", text: "In an adult, which pulse is most appropriate to check first for perfusion status?", options: ["Pedal", "Brachial", "Radial", "Femoral only", "Carotid only in all patients"], correctIndex: 2, explanation: "Radial pulse presence suggests systolic BP is likely adequate; use carotid in unresponsive patients." },
  { id: 356, level: "EMT", category: "Primary Assessment", text: "A patient has a patent airway, RR 10 with shallow breaths, SpO2 91%. Best action is:", options: ["Nasal cannula at 2 L/min only", "Encourage deep breaths", "Assist ventilations with BVM", "No intervention", "Give water"], correctIndex: 2, explanation: "Shallow/inadequate breathing requires assisted ventilation, not just low-flow oxygen." },
  { id: 357, level: "EMT", category: "Primary Assessment", text: "Which finding indicates the need for immediate airway intervention?", options: ["Speaking clearly", "Mild wheeze with normal speech", "Inability to maintain airway with gurgling/secretions", "Normal SpO2", "Pain 10/10"], correctIndex: 2, explanation: "Airway compromise (gurgling/secretions, inability to protect airway) requires immediate management." },
  { id: 358, level: "EMT", category: "Primary Assessment", text: "A patient is found unresponsive, breathing normally, pulse present. After opening/maintaining the airway, you should:", options: ["Start chest compressions", "Place in recovery position if no trauma and monitor", "Give aspirin", "Perform abdominal thrusts", "Stop assessment until ALS arrives"], correctIndex: 1, explanation: "With normal breathing and a pulse, protect airway and monitor; recovery position helps prevent aspiration if no trauma." },
  { id: 359, level: "EMT", category: "Primary Assessment", text: "The most concerning sign in a patient with allergic reaction is:", options: ["Itchy eyes", "Hives only", "Swelling of lips/tongue with wheezing", "Mild nausea", "Localized redness"], correctIndex: 2, explanation: "Airway swelling and wheezing indicate anaphylaxis—an immediate life threat." },
  { id: 360, level: "EMT", category: "Primary Assessment", text: "During primary assessment, after airway and breathing, you should assess circulation by:", options: ["Taking a full neuro exam", "Looking for major bleeding and checking pulse/skin", "Obtaining full medication list", "Palpating the abdomen", "Asking OPQRST first"], correctIndex: 1, explanation: "Circulation assessment focuses on hemorrhage control and perfusion (pulse/skin) early." },

  // 3) Secondary Assessment (EMT) — 361–390
  { id: 361, level: "EMT", category: "Secondary Assessment", text: "OPQRST is most useful for evaluating:", options: ["All vital signs", "Mental status only", "Pain or symptom complaints", "Blood glucose", "Scene hazards"], correctIndex: 2, explanation: "OPQRST structures symptom assessment: Onset, Provocation/Palliation, Quality, Radiation, Severity, Time." },
  { id: 362, level: "EMT", category: "Secondary Assessment", text: "SAMPLE history includes all EXCEPT:", options: ["Signs/Symptoms", "Allergies", "Medications", "Past medical history", "Pulse oximetry"], correctIndex: 4, explanation: "Pulse oximetry is a vital sign, not part of SAMPLE history." },
  { id: 363, level: "EMT", category: "Secondary Assessment", text: "DCAP-BTLS is used to assess:", options: ["Medication allergies", "Mechanism of injury only", "Skin temperature", "Trauma findings on physical exam", "Pulse strength"], correctIndex: 3, explanation: "DCAP-BTLS helps identify injuries: Deformities, Contusions, Abrasions, Punctures, Burns, Tenderness, Lacerations, Swelling." },
  { id: 364, level: "EMT", category: "Secondary Assessment", text: "In a medical patient with no trauma, a focused exam should be based on:", options: ["Head-to-toe only", "Chief complaint", "Random body system", "What partner prefers", "Mechanism of injury"], correctIndex: 1, explanation: "A focused assessment targets systems related to the chief complaint." },
  { id: 365, level: "EMT", category: "Secondary Assessment", text: "The best place to auscultate breath sounds is:", options: ["Over the stomach", "Over clothing only", "At the trachea only", "At multiple lung fields bilaterally", "Only at the bases"], correctIndex: 3, explanation: "Compare bilateral lung fields in multiple locations for equality and abnormal sounds." },
  { id: 366, level: "EMT", category: "Secondary Assessment", text: "A ‘sample’ medication list should include:", options: ["Only current prescriptions", "Only OTC medications", "Dose and last time taken when possible", "Only vitamins", "Only medications taken today"], correctIndex: 2, explanation: "Knowing dose and last taken time can change treatment decisions and identifies contraindications." },
  { id: 367, level: "EMT", category: "Secondary Assessment", text: "Capillary refill time is LEAST reliable in:", options: ["Adults in warm environments", "Infants and children", "Patients with cold exposure", "Patients at rest", "Patients who are hydrated"], correctIndex: 2, explanation: "Cold causes peripheral vasoconstriction and can falsely prolong cap refill." },
  { id: 368, level: "EMT", category: "Secondary Assessment", text: "A patient’s GCS is 12. This indicates:", options: ["Normal mentation", "Mild to moderate impaired consciousness", "Brain death", "Only intoxication", "No need for reassessment"], correctIndex: 1, explanation: "GCS below 15 indicates impaired consciousness; 12 suggests moderate impairment requiring close monitoring." },
  { id: 369, level: "EMT", category: "Secondary Assessment", text: "In trauma, the order of a rapid head-to-toe exam should prioritize:", options: ["Feet to head", "Area of greatest bleeding and life threats", "Hair and nails", "Only the painful area", "Skipping the back"], correctIndex: 1, explanation: "Quickly find and treat life threats and major bleeding; then proceed systematically (including the back when feasible)." },
  { id: 370, level: "EMT", category: "Secondary Assessment", text: "For a patient with shortness of breath, the most useful additional focused assessment is:", options: ["Abdominal palpation only", "Lung sounds and work of breathing evaluation", "Full musculoskeletal exam", "Skin assessment only", "Eye exam only"], correctIndex: 1, explanation: "Respiratory complaints require lung auscultation and evaluation of effort, rate, and accessory muscle use." },
  { id: 371, level: "EMT", category: "Secondary Assessment", text: "A patient describes chest pain as “pressure” radiating to the left arm. This pattern is most consistent with:", options: ["Appendicitis", "Pulmonary embolism always", "Cardiac ischemia", "Kidney stone", "Heat exhaustion"], correctIndex: 2, explanation: "Pressure-like chest pain radiating to the arm is classic for cardiac ischemia/ACS." },
  { id: 372, level: "EMT", category: "Secondary Assessment", text: "When assessing pupils, you should note:", options: ["Only color", "Only size", "PERRL (size, equality, and reactivity)", "Only dilation", "Only redness"], correctIndex: 2, explanation: "Pupil assessment includes size, equality, and reaction to light." },
  { id: 373, level: "EMT", category: "Secondary Assessment", text: "In a suspected stroke, the most useful field screening includes:", options: ["Blood pressure only", "FAST/BE-FAST findings", "Urine ketones", "Peak flow", "Tourniquet test"], correctIndex: 1, explanation: "Stroke screens (FAST/BE-FAST) rapidly identify facial droop, arm drift, speech deficits, and time/vision/balance issues." },
  { id: 374, level: "EMT", category: "Secondary Assessment", text: "A patient has a history of seizures. After a seizure, they are sleepy but breathing adequately. This is most consistent with:", options: ["Malingering", "Postictal state", "Heat stroke", "Psychosis", "Anaphylaxis"], correctIndex: 1, explanation: "Postictal state is common after seizures: confusion, fatigue, and gradual return of normal mentation." },
  { id: 375, level: "EMT", category: "Secondary Assessment", text: "A patient reports “worst headache of my life” with sudden onset. This is concerning for:", options: ["Migraine only", "Subarachnoid hemorrhage", "Food poisoning", "Asthma", "Urticaria"], correctIndex: 1, explanation: "Sudden severe “thunderclap” headache is a red flag for subarachnoid hemorrhage." },
  { id: 376, level: "EMT", category: "Secondary Assessment", text: "When palpating the abdomen, the best technique is:", options: ["Deep palpation first", "Start painful area first", "Palpate gently, start away from pain", "No palpation in any patient", "Strike quickly to elicit guarding"], correctIndex: 2, explanation: "Begin gently away from the painful area to avoid increasing pain and guarding." },
  { id: 377, level: "EMT", category: "Secondary Assessment", text: "The MOST important time-related question for stroke assessment is:", options: ["Last meal", "Last normal (symptom onset/last known well)", "Last bowel movement", "Last exercise", "Last aspirin dose"], correctIndex: 1, explanation: "Eligibility for stroke interventions depends on the last known well time." },
  { id: 378, level: "EMT", category: "Secondary Assessment", text: "A patient has suspected GI bleed. Which finding supports this?", options: ["Clear urine", "Black, tarry stools", "Dry skin", "Dilated pupils", "Hives"], correctIndex: 1, explanation: "Melena (black, tarry stool) suggests upper GI bleeding." },
  { id: 379, level: "EMT", category: "Secondary Assessment", text: "When documenting vitals, the best practice is to:", options: ["Estimate BP if busy", "Record one set only", "Trend and reassess at appropriate intervals", "Avoid documenting mental status", "Only document abnormal values"], correctIndex: 2, explanation: "Trending vitals over time helps identify deterioration and response to treatment." },
  { id: 380, level: "EMT", category: "Secondary Assessment", text: "A trauma patient has JVD and absent breath sounds on one side with severe distress. This suggests:", options: ["Simple pneumothorax", "Tension pneumothorax", "Asthma attack", "CHF only", "Pneumonia"], correctIndex: 1, explanation: "JVD + unilateral absent sounds + distress strongly indicates tension pneumothorax (life threat)." },
  { id: 381, level: "EMT", category: "Secondary Assessment", text: "A patient has rapid breathing and a fruity odor on breath. This is most consistent with:", options: ["Opioid overdose", "Diabetic ketoacidosis", "CHF", "Stroke", "Anaphylaxis"], correctIndex: 1, explanation: "Fruity breath and Kussmaul respirations suggest DKA." },
  { id: 382, level: "EMT", category: "Secondary Assessment", text: "The best way to assess skin signs is to check:", options: ["Only the hands", "Only the face", "Exposed areas for color, temperature, moisture", "Only under clothing", "Only the feet"], correctIndex: 2, explanation: "Assess exposed skin for overall perfusion: color, temp, and moisture." },
  { id: 383, level: "EMT", category: "Secondary Assessment", text: "A patient with asthma is using accessory muscles and speaking in 1–2 word sentences. This indicates:", options: ["Mild attack", "Severe distress", "No respiratory issue", "Only anxiety", "Normal work of breathing"], correctIndex: 1, explanation: "One- to two-word speech and accessory muscle use indicate severe respiratory distress." },
  { id: 384, level: "EMT", category: "Secondary Assessment", text: "A patient has pinpoint pupils and depressed mental status. This combination suggests:", options: ["Cocaine toxicity", "Opioid intoxication", "Hyperglycemia", "Sepsis", "CHF"], correctIndex: 1, explanation: "Pinpoint pupils with CNS depression is classic for opioid intoxication (though not exclusive)." },
  { id: 385, level: "EMT", category: "Secondary Assessment", text: "In trauma, crepitus felt under the skin of the chest/neck is called:", options: ["Flail chest", "Subcutaneous emphysema", "Tracheal deviation", "Rales", "Stridor"], correctIndex: 1, explanation: "Subcutaneous emphysema feels like crackling and indicates air in soft tissues." },
  { id: 386, level: "EMT", category: "Secondary Assessment", text: "A patient has inspiratory stridor. This most likely indicates:", options: ["Lower airway wheeze", "Upper airway obstruction", "Normal breathing", "GI bleed", "Hypoglycemia"], correctIndex: 1, explanation: "Stridor is a high-pitched sound from upper airway narrowing/obstruction." },
  { id: 387, level: "EMT", category: "Secondary Assessment", text: "The most reliable sign of adequate breathing is:", options: ["RR alone", "SpO2 alone", "Adequate tidal volume with normal effort and mentation", "Coughing", "Skin temperature"], correctIndex: 2, explanation: "Adequate breathing requires sufficient rate AND depth with normal work of breathing and oxygenation." },
  { id: 388, level: "EMT", category: "Secondary Assessment", text: "When assessing a child, the most sensitive early indicator of shock is often:", options: ["Hypotension", "Bradycardia", "Tachycardia", "Cyanosis", "Fixed pupils"], correctIndex: 2, explanation: "Children compensate until late; tachycardia can be an early sign of shock." },
  { id: 389, level: "EMT", category: "Secondary Assessment", text: "A patient has sudden unilateral weakness and slurred speech. The most important additional test is:", options: ["Peak flow", "Blood glucose check", "Urinalysis", "Pregnancy test", "Stool guaiac"], correctIndex: 1, explanation: "Hypoglycemia can mimic stroke; checking glucose is a key prehospital step." },
  { id: 390, level: "EMT", category: "Secondary Assessment", text: "For a patient with abdominal pain, the most helpful OPQRST element for emergent causes is:", options: ["Favorite foods", "Severity (0–10) and onset", "Hair color", "Exercise routine", "Sleep schedule"], correctIndex: 1, explanation: "Sudden onset and severe pain can indicate time-sensitive abdominal emergencies." },

  // 4) Scene Size-Up (EMT) — 391–420
  { id: 391, level: "EMT", category: "Scene Size-Up", text: "At any scene, your FIRST priority is:", options: ["Start patient assessment immediately", "Determine patient’s insurance", "Scene safety and PPE", "Obtain family history", "Call the hospital"], correctIndex: 2, explanation: "Scene safety (including PPE) comes first to prevent rescuer injury." },
  { id: 392, level: "EMT", category: "Scene Size-Up", text: "At a motor vehicle collision, the best indicator of injury potential is:", options: ["Patient age only", "Mechanism of injury", "Time of day", "Color of the car", "Weather forecast"], correctIndex: 1, explanation: "MOI helps predict hidden injuries and guides transport/assessment urgency." },
  { id: 393, level: "EMT", category: "Scene Size-Up", text: "You arrive at a scene with multiple patients. Your first action should include:", options: ["Treat the loudest patient first", "Call for additional resources early", "Load one patient and leave", "Ask for signatures", "Ignore bystanders"], correctIndex: 1, explanation: "Early resource requests improve outcomes in MCI and prevent delays." },
  { id: 394, level: "EMT", category: "Scene Size-Up", text: "A diamond-shaped placard with the number 2 indicates:", options: ["Flammable liquid", "Non-flammable gas", "Corrosive", "Explosive", "Radioactive"], correctIndex: 1, explanation: "HazMat placard class 2 indicates gases; treat as hazardous and stage appropriately." },
  { id: 395, level: "EMT", category: "Scene Size-Up", text: "For HazMat incidents, the best approach is to:", options: ["Approach from downwind to avoid smoke", "Approach from upwind, uphill, and upstream", "Enter quickly to rescue", "Park next to the scene for access", "Ignore placards if no smell"], correctIndex: 1, explanation: "Stage upwind/uphill/upstream to reduce exposure until HazMat declares it safe." },
  { id: 396, level: "EMT", category: "Scene Size-Up", text: "When is spinal motion restriction MOST indicated based on scene size-up?", options: ["Any minor fall", "Low-speed rear-end crash only", "High-energy mechanism with altered mental status", "Stable medical complaint", "Chronic back pain"], correctIndex: 2, explanation: "High-energy mechanism plus concerning findings (like AMS) increases risk of spine injury." },
  { id: 397, level: "EMT", category: "Scene Size-Up", text: "The purpose of scene size-up includes all EXCEPT:", options: ["Identify hazards", "Determine number of patients", "Determine need for additional resources", "Form a general impression", "Provide definitive diagnosis"], correctIndex: 4, explanation: "Scene size-up identifies risks and resources; it does not provide definitive diagnosis." },
  { id: 398, level: "EMT", category: "Scene Size-Up", text: "In an unsafe scene with active violence, you should:", options: ["Enter quickly to provide care", "Stage at a safe distance and wait for law enforcement", "Attempt to disarm the person", "Argue with the assailant", "Park closer to be faster"], correctIndex: 1, explanation: "Do not enter unsafe scenes; stage and wait for law enforcement to secure the area." },
  { id: 399, level: "EMT", category: "Scene Size-Up", text: "A scene has a strong smell of natural gas. Your best action is:", options: ["Turn on lights to see better", "Proceed inside to locate patient", "Stage away and request fire department/utility response", "Light a match to confirm", "Ventilate the room with fans"], correctIndex: 2, explanation: "Potential explosion hazard—stage away, request fire/utility, and do not create ignition sources." },
  { id: 400, level: "EMT", category: "Scene Size-Up", text: "If you suspect a carbon monoxide exposure, you should:", options: ["Open windows and stay inside to treat", "Move patient to fresh air and request additional resources", "Give oral glucose first", "Use naloxone", "Ignore if patient is awake"], correctIndex: 1, explanation: "Remove from exposure to fresh air, provide oxygen, and involve fire department for scene safety." },
  { id: 401, level: "EMT", category: "Scene Size-Up", text: "When calling for ALS on scene size-up, the strongest indication is:", options: ["Minor abrasion", "Stable ankle fracture", "Chest pain with diaphoresis and hypotension", "Mild nausea", "Chronic headache"], correctIndex: 2, explanation: "Potentially unstable cardiac patients benefit from ALS interventions and rapid transport." },
  { id: 402, level: "EMT", category: "Scene Size-Up", text: "A patient is found lying next to a ladder. This is an example of:", options: ["Nature of illness", "Mechanism of injury", "Past medical history", "Secondary assessment", "Transport decision"], correctIndex: 1, explanation: "A ladder suggests a fall mechanism and guides injury suspicion." },
  { id: 403, level: "EMT", category: "Scene Size-Up", text: "The BEST place to park the ambulance at a highway MVC is:", options: ["In the left lane near traffic", "Downstream to protect the scene with lights and barrier positioning", "In front of the crashed vehicles", "On a blind curve", "Anywhere that blocks responders"], correctIndex: 1, explanation: "Position the ambulance to protect the scene and responders (blocking), per local policy." },
  { id: 404, level: "EMT", category: "Scene Size-Up", text: "For a patient trapped in a vehicle, scene size-up should include early request for:", options: ["Poison control", "Towing company only", "Extrication/fire resources", "Animal control", "A chaplain only"], correctIndex: 2, explanation: "Extrication requires specialized tools/personnel; request early to reduce delays." },
  { id: 405, level: "EMT", category: "Scene Size-Up", text: "A patient has burns after a house fire. Most important scene concern is:", options: ["Sun exposure", "Potential inhalation injury and toxic smoke", "Food allergy", "Hypoglycemia", "Sprain risk"], correctIndex: 1, explanation: "Fire victims may have inhalation injury/CO exposure even with minor skin burns." },
  { id: 406, level: "EMT", category: "Scene Size-Up", text: "In an MCI, triage should:", options: ["Be delayed until everyone is assessed fully", "Be quick and prioritize greatest survivability with limited resources", "Treat minor injuries first", "Focus on paperwork", "Ignore walking wounded"], correctIndex: 1, explanation: "Triage rapidly sorts patients to allocate limited resources and maximize survival." },
  { id: 407, level: "EMT", category: "Scene Size-Up", text: "The MOST appropriate initial action at a suspected crime scene is:", options: ["Touch/collect evidence", "Move items to reach patient", "Provide care while preserving evidence and limit disturbance", "Question suspects aggressively", "Take photos for social media"], correctIndex: 2, explanation: "Provide patient care but preserve evidence and minimize scene disruption when possible." },
  { id: 408, level: "EMT", category: "Scene Size-Up", text: "You arrive to a patient who collapsed in a restaurant. Bystanders report “he just choked.” Your first step is:", options: ["Ask for a full SAMPLE history", "Check responsiveness and breathing immediately", "Give water", "Perform abdominal thrusts without assessment", "Wait for ALS"], correctIndex: 1, explanation: "Start with responsiveness and breathing/pulse assessment to determine immediate interventions." },
  { id: 409, level: "EMT", category: "Scene Size-Up", text: "The term “nature of illness” refers to:", options: ["How fast you should drive", "The medical problem suspected from initial info", "Only trauma mechanism", "Patient’s insurance", "Hospital destination"], correctIndex: 1, explanation: "NOI is the suspected medical problem based on dispatch and initial scene observations." },
  { id: 410, level: "EMT", category: "Scene Size-Up", text: "If you suspect downed power lines at a crash, you should:", options: ["Approach and move them with gloves", "Stay away and request the utility company/fire department", "Park under the lines", "Use water to cool them", "Touch the vehicle to check"], correctIndex: 1, explanation: "Downed lines are lethal; maintain distance and request appropriate agencies." },
  { id: 411, level: "EMT", category: "Scene Size-Up", text: "For suspected hazardous materials, the ‘hot zone’ is:", options: ["The safe staging area", "Where contamination is present", "The rehab area", "The command post", "The ambulance bay"], correctIndex: 1, explanation: "The hot zone is the contaminated area; EMS typically stages in cold/warm zones as directed." },
  { id: 412, level: "EMT", category: "Scene Size-Up", text: "A patient is found after a high-speed rollover with ejection. This MOI suggests:", options: ["Low risk of injury", "High risk of multisystem trauma", "Only minor abrasions", "No need for spinal precautions ever", "Only psychological distress"], correctIndex: 1, explanation: "Ejection/high-speed rollover is high-energy trauma with high likelihood of internal injuries." },
  { id: 413, level: "EMT", category: "Scene Size-Up", text: "A key reason to determine number of patients early is to:", options: ["Choose music in ambulance", "Decide who pays", "Request sufficient resources and ambulances", "Avoid documentation", "Skip triage"], correctIndex: 2, explanation: "Knowing patient count helps allocate resources and prevents overwhelm." },
  { id: 414, level: "EMT", category: "Scene Size-Up", text: "If a scene has aggressive dogs preventing access, you should:", options: ["Enter anyway", "Use your siren to scare them and proceed", "Request animal control/law enforcement and stage safely", "Try to pet them", "Throw objects at them"], correctIndex: 2, explanation: "Scene safety first; request help and avoid injury." },
  { id: 415, level: "EMT", category: "Scene Size-Up", text: "The BEST method to reduce risk of infection at any scene is:", options: ["Wearing gloves and appropriate PPE", "Only washing hands at end of shift", "Avoiding all patients with cough", "Using antibiotics routinely", "Never cleaning equipment"], correctIndex: 0, explanation: "Appropriate PPE and hand hygiene are primary infection-control measures." },
  { id: 416, level: "EMT", category: "Scene Size-Up", text: "At a bus crash with many victims, your first operational priority is:", options: ["Load the first patient you see", "Establish incident command and request resources", "Perform detailed histories", "Transport only the walking wounded", "Wait for media"], correctIndex: 1, explanation: "ICS and resource coordination are critical early in MCIs." },
  { id: 417, level: "EMT", category: "Scene Size-Up", text: "If you see a hazmat placard but are unsure of meaning, you should:", options: ["Approach closely to read it", "Ignore it if no symptoms", "Stage and use guides/resources while awaiting trained responders", "Touch the container to check temperature", "Open the container"], correctIndex: 2, explanation: "Do not approach unknown HazMat; stage and use reference resources and specialized teams." },
  { id: 418, level: "EMT", category: "Scene Size-Up", text: "The most appropriate early action if you suspect child abuse is to:", options: ["Confront caregivers loudly", "Accuse the child of lying", "Document objectively and follow reporting policy", "Refuse to transport", "Post details online"], correctIndex: 2, explanation: "Document findings objectively and follow mandated reporting procedures per law/policy." },
  { id: 419, level: "EMT", category: "Scene Size-Up", text: "A patient is on the floor with empty alcohol bottles. This is best categorized as:", options: ["Mechanism of injury", "Nature of illness clues", "Secondary assessment", "Transfer of care", "Medication administration"], correctIndex: 1, explanation: "Scene clues (bottles) inform suspected NOI such as intoxication/withdrawal." },
  { id: 420, level: "EMT", category: "Scene Size-Up", text: "At a scene with a suspected structural collapse, you should:", options: ["Enter immediately to rescue", "Stage in the collapse zone", "Wait for USAR/engineers and operate only in safe zones", "Climb debris to assess", "Turn off your radio"], correctIndex: 2, explanation: "Structural collapse is highly hazardous; wait for specialized rescue and operate only when safe." },

  // 5) EMS Operations (EMT) — 421–450
  { id: 421, level: "EMT", category: "EMS Operations", text: "Consent for treatment of an unconscious adult is typically:", options: ["Not required ever", "Implied consent", "Only verbal consent", "Only written consent", "Refused automatically"], correctIndex: 1, explanation: "Unconscious patients are treated under implied consent when life threats are present." },
  { id: 422, level: "EMT", category: "EMS Operations", text: "A competent adult refuses transport. The EMT should:", options: ["Force transport", "Leave without documentation", "Ensure decision-making capacity, explain risks, and document refusal", "Call police to arrest patient", "Take the patient’s ID as proof"], correctIndex: 2, explanation: "Assess capacity, inform risks/benefits, offer alternatives, obtain signatures/witness per protocol, and document thoroughly." },
  { id: 423, level: "EMT", category: "EMS Operations", text: "The best way to reduce legal risk in documentation is to:", options: ["Write opinions and insults", "Use vague terms like “fine”", "Document objective findings and times clearly", "Alter PCR after shift without addendum", "Use slang only"], correctIndex: 2, explanation: "Objective, complete, timely documentation with accurate times supports patient care and legal defensibility." },
  { id: 424, level: "EMT", category: "EMS Operations", text: "HIPAA allows sharing patient information:", options: ["With anyone who asks", "Only with the media", "For treatment/operations or as permitted by law", "On social media if no name used", "With friends if you’re off duty"], correctIndex: 2, explanation: "Share only for legitimate care/operational/legal reasons and follow privacy rules." },
  { id: 425, level: "EMT", category: "EMS Operations", text: "The most important reason to clean and disinfect equipment is:", options: ["Make it look new", "Prevent disease transmission", "Avoid paperwork", "Improve fuel economy", "Make it quieter"], correctIndex: 1, explanation: "Decontamination prevents spread of infectious disease between patients and providers." },
  { id: 426, level: "EMT", category: "EMS Operations", text: "Which is an example of abandonment?", options: ["Transfer care to equal/higher provider", "Leaving a patient after care is started without ensuring equal/higher care", "Patient refusal after capacity check", "Documentation completion", "Calling ALS"], correctIndex: 1, explanation: "Abandonment occurs when care is terminated without appropriate handoff or patient refusal with capacity." },
  { id: 427, level: "EMT", category: "EMS Operations", text: "When driving with lights and sirens, you should:", options: ["Ignore red lights", "Drive faster than you can control", "Still operate with due regard and obey policies/laws", "Assume all drivers see you", "Use siren only at intersections"], correctIndex: 2, explanation: "Emergency driving requires due regard; you are still responsible for safe operation." },
  { id: 428, level: "EMT", category: "EMS Operations", text: "A DNR order generally means:", options: ["Do not provide any care", "Do not treat pain", "Do not perform resuscitation efforts like CPR/defib", "Do not transport", "Do not give oxygen"], correctIndex: 2, explanation: "DNR limits resuscitation; comfort care and other treatments may still be appropriate per policy." },
  { id: 429, level: "EMT", category: "EMS Operations", text: "The BEST example of scope of practice is:", options: ["Anything you feel confident doing", "Skills allowed by your level and local regulations/protocols", "Only what a doctor can do", "Only what you learned once", "Anything the patient asks"], correctIndex: 1, explanation: "Scope is defined by certification level and state/local medical direction and protocol." },
  { id: 430, level: "EMT", category: "EMS Operations", text: "If you are exposed to a patient’s blood, your FIRST action should be:", options: ["Finish the call first, then wash", "Immediately wash/flush the area and report per policy", "Ignore it if you wore gloves", "Post online for advice", "Self-prescribe antibiotics"], correctIndex: 1, explanation: "Immediate decontamination and prompt reporting are required for exposure management." },
  { id: 431, level: "EMT", category: "EMS Operations", text: "A minor can consent to treatment without a parent MOST commonly when:", options: ["They are under 10", "They are emancipated or for specific conditions per law", "They refuse always", "They are with friends", "They speak English"], correctIndex: 1, explanation: "Emancipation and certain legally defined circumstances allow minor consent depending on jurisdiction." },
  { id: 432, level: "EMT", category: "EMS Operations", text: "Medical direction can be:", options: ["Only online", "Only offline", "Online (direct) and offline (protocols/training)", "Never needed", "Only hospital-based"], correctIndex: 2, explanation: "EMS functions under both online medical control and offline protocols/training/QA." },
  { id: 433, level: "EMT", category: "EMS Operations", text: "If you suspect elder abuse, you should:", options: ["Ignore it to avoid conflict", "Confront family aggressively", "Report per mandated reporting laws and document objectively", "Wait for the hospital to decide", "Ask the media to investigate"], correctIndex: 2, explanation: "Follow reporting laws/policy and document objective findings and statements." },
  { id: 434, level: "EMT", category: "EMS Operations", text: "The MAIN purpose of a run report (PCR) is:", options: ["Entertainment", "Billing only", "Medical and legal record of assessment, care, and response", "To blame other providers", "To avoid QA"], correctIndex: 2, explanation: "PCR documents patient condition, treatments, and timeline; it’s both clinical and legal." },
  { id: 435, level: "EMT", category: "EMS Operations", text: "If a patient is incompetent (lacks capacity), refusal of care is:", options: ["Always valid", "Valid only if written", "Not valid; seek appropriate surrogate/implied consent and involve medical control/law enforcement as needed", "Never transport", "Automatically call media"], correctIndex: 2, explanation: "Refusal requires decision-making capacity; without it, treatment/transport may proceed under implied consent or surrogate consent." },
  { id: 436, level: "EMT", category: "EMS Operations", text: "The best way to communicate with the receiving facility is to give:", options: ["Only patient name", "A long story with no vitals", "A concise report: age/sex, chief complaint, key findings, vitals, treatments, ETA", "Only your opinion", "No ETA"], correctIndex: 2, explanation: "A structured concise report supports continuity of care and preparedness." },
  { id: 437, level: "EMT", category: "EMS Operations", text: "If a patient requests confidentiality from family on scene, you should:", options: ["Tell family everything anyway", "Share only what patient permits (unless legally required)", "Refuse to treat", "Ask family to sign", "Post updates online"], correctIndex: 1, explanation: "Protect patient privacy; disclose only necessary information for care or as legally required." },
  { id: 438, level: "EMT", category: "EMS Operations", text: "The term ‘negligence’ in EMS generally means:", options: ["Providing perfect care", "Deviation from accepted standard of care causing harm", "Any bad outcome", "Refusing transport always", "Writing too much in PCR"], correctIndex: 1, explanation: "Negligence is failure to act as a reasonable EMS provider would, resulting in harm." },
  { id: 439, level: "EMT", category: "EMS Operations", text: "When lifting/powering a stretcher, best injury prevention is:", options: ["Lift with the back", "Twist while lifting", "Use legs, keep load close, and coordinate commands", "Lift alone to be faster", "Lock knees to stabilize"], correctIndex: 2, explanation: "Proper body mechanics and team coordination reduce musculoskeletal injuries." },
  { id: 440, level: "EMT", category: "EMS Operations", text: "A patient’s personal belongings should be:", options: ["Left on scene always", "Taken by EMS without documentation", "Secured and documented per policy, transferred with patient", "Given to a random bystander", "Thrown away"], correctIndex: 2, explanation: "Secure and document valuables and transfer appropriately to maintain chain of custody and avoid claims." },
  { id: 441, level: "EMT", category: "EMS Operations", text: "When using the radio, the best practice is to:", options: ["Talk over others", "Use clear text and be concise", "Use patient name and diagnosis loudly", "Transmit unnecessary details", "Avoid acknowledging orders"], correctIndex: 1, explanation: "Clear, concise communication supports safety and limits privacy exposure." },
  { id: 442, level: "EMT", category: "EMS Operations", text: "A ‘mandatory report’ most commonly applies to:", options: ["Minor rashes", "Suspected child/elder abuse and certain injuries per law", "All headaches", "All refusals", "All intoxication"], correctIndex: 1, explanation: "Many jurisdictions require reporting suspected abuse and some injuries (e.g., certain assaults) per law." },
  { id: 443, level: "EMT", category: "EMS Operations", text: "If an EMT provides care outside protocols without justification and harm occurs, this is most consistent with:", options: ["Good Samaritan immunity always", "Negligence", "Quality assurance", "Protocol compliance", "Informed consent"], correctIndex: 1, explanation: "Departing from standard/protocol without medical direction can be negligent and increase liability." },
  { id: 444, level: "EMT", category: "EMS Operations", text: "The best definition of ‘standard of care’ is:", options: ["The fanciest care possible", "What a reasonable provider with similar training would do in similar circumstances", "Whatever the patient wants", "Only what textbooks say", "Only what the hospital does"], correctIndex: 1, explanation: "Standard of care is what a similarly trained provider would reasonably do given the situation." },
  { id: 445, level: "EMT", category: "EMS Operations", text: "If you must correct an error on a PCR, you should:", options: ["Erase it completely", "Use white-out", "Follow policy: single line through error, initial/date (or electronic addendum)", "Delete the whole report", "Change times to match memory"], correctIndex: 2, explanation: "Corrections must preserve integrity; use approved correction/addendum methods per policy." },
  { id: 446, level: "EMT", category: "EMS Operations", text: "A patient threatens self-harm and has a plan. Best action is:", options: ["Leave them alone to calm down", "Transport for evaluation and involve law enforcement/medical control per policy", "Give aspirin", "Ignore statements if they are calm", "Let them sign refusal without assessment"], correctIndex: 1, explanation: "Suicidal ideation with plan is high risk; ensure safety and transport with appropriate support per policy." },
  { id: 447, level: "EMT", category: "EMS Operations", text: "During transfer of care, the MOST important step is:", options: ["Leave before report to save time", "Give a clear verbal report and ensure the receiving provider accepts care", "Hand over only the PCR later", "Avoid mentioning treatments", "Only talk to family"], correctIndex: 1, explanation: "Abandonment is avoided by giving report and ensuring care is accepted by the receiving provider." },
  { id: 448, level: "EMT", category: "EMS Operations", text: "Which is the best example of ‘expressed consent’?", options: ["Unconscious trauma patient", "Confused dementia patient", "Competent adult verbally agrees to treatment", "Child without guardian", "Cardiac arrest patient"], correctIndex: 2, explanation: "Expressed consent is a competent patient’s informed agreement (verbal or written) to care." },
  { id: 449, level: "EMT", category: "EMS Operations", text: "If a bystander records you providing care, you should:", options: ["Take their phone", "Stop treating", "Continue providing professional care and follow agency policy", "Argue and threaten them", "Share patient details to explain"], correctIndex: 2, explanation: "Focus on patient care and professionalism; follow policy and protect privacy." },
  { id: 450, level: "EMT", category: "EMS Operations", text: "If you are first on scene and need more ambulances, the best time to request them is:", options: ["After transport begins", "After you finish paperwork", "Early during scene size-up", "After family arrives", "Never; wait for dispatch"], correctIndex: 2, explanation: "Early requests prevent delays and improve patient care in multi-patient incidents." },

  // ================= PARAMEDIC CATEGORIES =================

  // 1) Clinical Judgment (Paramedic) — 451–475
  { id: 451, level: "Paramedic", category: "Clinical Judgment", text: "A dyspneic patient has wheezing, prolonged expiration, and history of COPD. Best initial ventilatory strategy is:", options: ["Fast ventilations at 30/min", "Low tidal volume with prolonged exhalation time", "No oxygen ever", "Hyperventilate to lower CO2 quickly", "Immediate sodium bicarbonate"], correctIndex: 1, explanation: "COPD requires allowing adequate exhalation (avoid air trapping) with controlled rate and longer expiratory phase." },
  { id: 452, level: "Paramedic", category: "Clinical Judgment", text: "A hypotensive trauma patient remains tachycardic after controlling external bleeding. Next priority is to suspect and treat:", options: ["Appendicitis", "Occult internal hemorrhage/shock", "Migraine", "Allergic rhinitis", "Simple dehydration only"], correctIndex: 1, explanation: "Persistent shock after external control suggests internal bleeding—rapid transport and shock management are critical." },
  { id: 453, level: "Paramedic", category: "Clinical Judgment", text: "A patient with fever, hypotension, altered mental status, and warm flushed skin early on suggests:", options: ["Cardiogenic shock", "Septic shock", "Neurogenic shock always", "Hypovolemic shock only", "Anxiety attack"], correctIndex: 1, explanation: "Sepsis can present with hypotension and altered mental status; warm flushed skin may occur early (distributive shock)." },
  { id: 454, level: "Paramedic", category: "Clinical Judgment", text: "A patient has sudden dyspnea, pleuritic chest pain, and unilateral leg swelling. Most concerning diagnosis is:", options: ["CHF", "Pulmonary embolism", "GERD", "Asthma only", "Appendicitis"], correctIndex: 1, explanation: "Classic PE features include sudden dyspnea, pleuritic pain, and signs of DVT." },
  { id: 455, level: "Paramedic", category: "Clinical Judgment", text: "A patient is agitated, diaphoretic, tachycardic, hypertensive, and has dilated pupils after unknown drug use. Most consistent toxidrome is:", options: ["Opioid", "Sympathomimetic", "Cholinergic", "Sedative-hypnotic", "Anticholinergic with dry skin only"], correctIndex: 1, explanation: "Sympathomimetic toxidrome often causes agitation, diaphoresis, tachycardia, hypertension, and mydriasis." },
  { id: 456, level: "Paramedic", category: "Clinical Judgment", text: "A patient with AMS has glucose 38 mg/dL. Most appropriate immediate treatment is:", options: ["Naloxone", "Dextrose/Glucagon per route and protocol", "Aspirin", "Nitroglycerin", "Furosemide"], correctIndex: 1, explanation: "Correct hypoglycemia immediately with glucose replacement per protocol and patient condition." },
  { id: 457, level: "Paramedic", category: "Clinical Judgment", text: "A patient with end-stage renal disease has peaked T waves and widening QRS. Most concerning electrolyte issue is:", options: ["Hyponatremia", "Hyperkalemia", "Hypercalcemia", "Hypomagnesemia", "Hypochloremia"], correctIndex: 1, explanation: "Peaked T waves and QRS widening in ESRD suggest hyperkalemia." },
  { id: 458, level: "Paramedic", category: "Clinical Judgment", text: "A patient has crushing chest pain, diaphoresis, and inferior STEMI pattern. They become hypotensive after nitro. Most likely cause is:", options: ["Aortic dissection", "Right ventricular infarct with preload dependence", "Pneumonia", "Panic attack", "Hyperventilation syndrome"], correctIndex: 1, explanation: "Inferior MI may involve RV; nitrates can drop preload and cause hypotension." },
  { id: 459, level: "Paramedic", category: "Clinical Judgment", text: "A patient with trauma has hypotension and bradycardia with warm dry skin. Most likely shock type is:", options: ["Hypovolemic", "Neurogenic", "Cardiogenic", "Septic", "Anaphylactic"], correctIndex: 1, explanation: "Neurogenic shock can cause hypotension with bradycardia and warm skin due to loss of sympathetic tone." },
  { id: 460, level: "Paramedic", category: "Clinical Judgment", text: "In respiratory acidosis from hypoventilation, the primary problem is:", options: ["Low CO2", "High CO2", "Low lactate", "High bicarbonate causing alkalosis", "Low potassium always"], correctIndex: 1, explanation: "Hypoventilation retains CO2, causing respiratory acidosis." },
  { id: 461, level: "Paramedic", category: "Clinical Judgment", text: "A patient presents with severe headache, hypertension, bradycardia, and irregular respirations. This triad suggests:", options: ["Cushing response (increased ICP)", "Septic shock", "Opioid overdose only", "COPD exacerbation", "PEA arrest"], correctIndex: 0, explanation: "Hypertension + bradycardia + irregular respirations is consistent with increased intracranial pressure (Cushing response)." },
  { id: 462, level: "Paramedic", category: "Clinical Judgment", text: "A patient with wheezing and hives after a bee sting is hypotensive. The most important medication is:", options: ["Diphenhydramine", "Albuterol", "Epinephrine", "Steroids only", "Furosemide"], correctIndex: 2, explanation: "Epinephrine is first-line for anaphylaxis with hypotension/airway involvement." },
  { id: 463, level: "Paramedic", category: "Clinical Judgment", text: "A patient with severe asthma now has silent chest and decreasing mental status. This indicates:", options: ["Improvement", "Impending respiratory failure", "Simple hyperventilation", "Mild attack", "Only anxiety"], correctIndex: 1, explanation: "Silent chest with fatigue/AMS is a late, critical sign—prepare for aggressive airway/ventilatory support." },
  { id: 464, level: "Paramedic", category: "Clinical Judgment", text: "A septic patient is hypotensive after fluids and remains poorly perfused. Next pharmacologic step is commonly:", options: ["Diuretics", "Vasopressor support per protocol", "Beta-blocker", "Nitroglycerin", "Adenosine"], correctIndex: 1, explanation: "Distributive shock may require vasopressors after adequate fluid resuscitation." },
  { id: 465, level: "Paramedic", category: "Clinical Judgment", text: "A patient is suddenly confused with slurred speech; glucose is normal. Highest priority system goal is:", options: ["Delay to observe", "Rapid stroke center transport with pre-notification", "Give aspirin immediately in all cases", "Give nitro", "Give morphine"], correctIndex: 1, explanation: "Time-dependent stroke care requires rapid transport and pre-notification." },
  { id: 466, level: "Paramedic", category: "Clinical Judgment", text: "A patient has metabolic acidosis from DKA. The body’s typical compensatory response is:", options: ["Bradypnea", "Kussmaul respirations (deep, rapid breathing)", "Apnea", "Shallow breathing", "No change"], correctIndex: 1, explanation: "Metabolic acidosis triggers hyperventilation to blow off CO2 (Kussmaul breathing)." },
  { id: 467, level: "Paramedic", category: "Clinical Judgment", text: "A trauma patient is hypotensive with muffled heart tones and JVD. Most likely diagnosis is:", options: ["Tension pneumothorax", "Cardiac tamponade", "COPD", "Pulmonary edema", "Asthma"], correctIndex: 1, explanation: "Beck’s triad (hypotension, JVD, muffled sounds) suggests cardiac tamponade." },
  { id: 468, level: "Paramedic", category: "Clinical Judgment", text: "A patient with severe GI bleed is tachycardic with narrow pulse pressure. This pattern suggests:", options: ["Distributive shock", "Hypovolemic shock", "Neurogenic shock", "Cardiogenic shock", "Obstructive shock"], correctIndex: 1, explanation: "Blood loss reduces preload causing tachycardia and narrowing pulse pressure (hypovolemia)." },
  { id: 469, level: "Paramedic", category: "Clinical Judgment", text: "A patient has respiratory alkalosis from anxiety hyperventilation. Best initial management is:", options: ["Immediate intubation", "Reassurance/coaching, rule out medical causes, monitor", "Sodium bicarbonate", "Furosemide", "Epinephrine infusion"], correctIndex: 1, explanation: "Coach breathing and evaluate for serious causes; avoid harmful interventions." },
  { id: 470, level: "Paramedic", category: "Clinical Judgment", text: "A patient with chest pain is hypotensive with clear lungs and ECG shows bradycardia. Most likely perfusion issue is:", options: ["Fluid overload", "Rate-dependent low cardiac output", "Asthma", "Sepsis", "Anaphylaxis"], correctIndex: 1, explanation: "Bradycardia can reduce cardiac output causing hypotension even with clear lungs." },
  { id: 471, level: "Paramedic", category: "Clinical Judgment", text: "In suspected intracranial hemorrhage, the most important airway/ventilation goal is:", options: ["Hyperventilate all head injuries to ETCO2 20", "Maintain oxygenation and normocapnia unless herniation signs", "Avoid oxygen completely", "Induce apnea", "Give large doses of narcotics only"], correctIndex: 1, explanation: "Maintain adequate oxygenation and normal ventilation; aggressive hyperventilation is reserved for impending herniation per protocol." },
  { id: 472, level: "Paramedic", category: "Clinical Judgment", text: "A patient has sudden severe tearing chest pain radiating to the back with unequal arm BPs. Most concerning diagnosis is:", options: ["Aortic dissection", "Stable angina", "Pneumonia", "GERD", "Asthma"], correctIndex: 0, explanation: "Tearing pain to the back with BP differential suggests aortic dissection—avoid routine anticoagulation and transport emergently." },
  { id: 473, level: "Paramedic", category: "Clinical Judgment", text: "A patient on dialysis is weak and has wide QRS with sine-wave appearance. Immediate stabilization often includes:", options: ["Magnesium", "Calcium administration per protocol", "Aspirin", "Nitro", "Adenosine"], correctIndex: 1, explanation: "In severe hyperkalemia, IV calcium stabilizes the cardiac membrane (per protocol)." },
  { id: 474, level: "Paramedic", category: "Clinical Judgment", text: "A patient with CHF is hypertensive and in severe respiratory distress. The best initial noninvasive support is:", options: ["High-dose opioids first", "CPAP and nitrates per protocol if not hypotensive", "Trendelenburg position", "Large fluid bolus", "Adenosine"], correctIndex: 1, explanation: "CPAP improves oxygenation and reduces preload/afterload; nitrates help if BP supports and not contraindicated." },
  { id: 475, level: "Paramedic", category: "Clinical Judgment", text: "A patient is pale, cool, and diaphoretic with low ETCO2 and weak pulses. This most likely indicates:", options: ["Improving perfusion", "Poor perfusion/shock", "Hyperventilation syndrome", "Normal physiology", "Heat exhaustion only"], correctIndex: 1, explanation: "Low ETCO2 with shock signs often indicates poor perfusion and low CO2 delivery to lungs." },

  // 2) Airway (Paramedic) — 476–500
  { id: 476, level: "Paramedic", category: "Airway", text: "The best confirmation of endotracheal tube placement in the field is:", options: ["Fogging in tube", "Equal chest rise alone", "Continuous waveform capnography", "Breath sounds only on left", "Pulse oximetry only"], correctIndex: 2, explanation: "Continuous waveform capnography is the most reliable confirmation of ET tube placement." },
  { id: 477, level: "Paramedic", category: "Airway", text: "When ventilating an intubated adult in cardiac arrest, correct rate is approximately:", options: ["20–30/min", "1 breath every 2 seconds", "1 breath every 6 seconds", "1 breath every 10 seconds", "No ventilations"], correctIndex: 2, explanation: "Ventilate about 10/min (1 breath every 6 seconds) without pausing compressions." },
  { id: 478, level: "Paramedic", category: "Airway", text: "A major complication of excessive ventilation during CPR is:", options: ["Improved venous return", "Decreased intrathoracic pressure", "Decreased coronary perfusion due to increased intrathoracic pressure", "More ROSC always", "Lower airway resistance"], correctIndex: 2, explanation: "Hyperventilation increases intrathoracic pressure, reducing venous return and perfusion." },
  { id: 479, level: "Paramedic", category: "Airway", text: "In RSI, the best method to prevent desaturation during apnea is:", options: ["Skip preoxygenation", "Aggressive suction only", "Adequate preoxygenation and apneic oxygenation per protocol", "Give diuretics", "Lower oxygen concentration"], correctIndex: 2, explanation: "Preoxygenation (and apneic oxygenation when used) maximizes oxygen reserves during intubation." },
  { id: 480, level: "Paramedic", category: "Airway", text: "A patient with facial trauma and inability to ventilate with BVM needs a rescue airway. Best next step is often:", options: ["Repeat BVM without adjuncts", "Supraglottic airway placement", "Oral glucose", "Aspirin", "Vagal maneuvers"], correctIndex: 1, explanation: "When BVM ventilation is inadequate, a supraglottic airway can rapidly improve ventilation." },
  { id: 481, level: "Paramedic", category: "Airway", text: "For suspected upper airway obstruction from anaphylaxis, the key medication is:", options: ["Furosemide", "Epinephrine", "Adenosine", "Atropine", "Calcium"], correctIndex: 1, explanation: "Epinephrine is first-line for anaphylaxis and can relieve airway edema/bronchospasm." },
  { id: 482, level: "Paramedic", category: "Airway", text: "The ‘BURP’ maneuver during laryngoscopy improves view by:", options: ["Increasing gastric pressure", "Moving larynx backward/upward/rightward", "Relaxing vocal cords", "Causing apnea", "Reducing secretions"], correctIndex: 1, explanation: "BURP helps align the laryngeal structures to improve glottic visualization." },
  { id: 483, level: "Paramedic", category: "Airway", text: "A patient has a stoma (tracheostomy) and is in respiratory distress. Oxygenation/ventilation should be delivered:", options: ["Only by nasal cannula", "Over the stoma with appropriate device", "By mouth only", "By NRB over mouth while occluding stoma", "Not possible"], correctIndex: 1, explanation: "For tracheostomy patients, oxygen/ventilation must be applied over the stoma/airway." },
  { id: 484, level: "Paramedic", category: "Airway", text: "If ETCO2 suddenly drops after successful intubation and bagging, the most concerning cause is:", options: ["Improved perfusion", "Tube displacement or loss of perfusion/ROSC changes", "Perfect tube placement", "Hyperglycemia", "Aspirin effect"], correctIndex: 1, explanation: "A sudden ETCO2 drop can indicate tube dislodgement or worsening perfusion; reassess immediately." },
  { id: 485, level: "Paramedic", category: "Airway", text: "A ‘difficult airway’ prediction tool (e.g., LEMON) helps you:", options: ["Choose antibiotics", "Plan airway strategy and backups", "Decide hospital destination only", "Treat hypotension", "Interpret ECG"], correctIndex: 1, explanation: "Airway prediction tools guide preparation, positioning, and backup planning before attempts." },
  { id: 486, level: "Paramedic", category: "Airway", text: "Cricoid pressure (Sellick) is best described as:", options: ["Always recommended", "A technique with mixed evidence that may worsen laryngoscopic view; use per protocol", "The same as jaw thrust", "Required for all intubations", "A suction technique"], correctIndex: 1, explanation: "Cricoid pressure can impede view/ventilation; apply only if indicated and per protocol." },
  { id: 487, level: "Paramedic", category: "Airway", text: "A patient has severe bronchospasm with high airway pressures on ventilation. Best immediate adjustment is:", options: ["Increase rate to 30/min", "Allow longer exhalation (reduce rate, adjust I:E) and treat bronchospasm", "Stop ventilation", "Increase tidal volume significantly", "Give furosemide"], correctIndex: 1, explanation: "Bronchospasm requires bronchodilation and ventilation strategy that avoids air trapping." },
  { id: 488, level: "Paramedic", category: "Airway", text: "The best sign of effective BVM ventilation is:", options: ["Gastric distention", "Chest rise with each ventilation and improving oxygenation", "Loud gurgling", "Patient fighting mask", "High ETCO2 in all cases"], correctIndex: 1, explanation: "Visible chest rise and improving oxygenation indicate adequate ventilation." },
  { id: 489, level: "Paramedic", category: "Airway", text: "In pediatric airway management, the MOST common cause of deterioration is:", options: ["Cardiac arrhythmia first", "Respiratory failure/hypoxia", "GI bleeding", "Kidney failure", "Stroke"], correctIndex: 1, explanation: "Children commonly arrest from respiratory failure; early oxygenation/ventilation is critical." },
  { id: 490, level: "Paramedic", category: "Airway", text: "When using a supraglottic airway, the most important monitoring tool is:", options: ["Blood pressure only", "Waveform capnography", "Pupil size", "Skin rash", "Urine output"], correctIndex: 1, explanation: "Waveform capnography confirms ventilation and detects displacement or perfusion changes." },
  { id: 491, level: "Paramedic", category: "Airway", text: "A patient has suspected increased ICP. The ventilation goal after securing airway is:", options: ["ETCO2 20 always", "Normocapnia (avoid hypo/hyperventilation) unless herniation signs", "No ventilation", "Very high CO2 to dilate vessels", "Only oxygen with no ventilation"], correctIndex: 1, explanation: "Maintain normal ventilation; aggressive hyperventilation is reserved for impending herniation per protocol." },
  { id: 492, level: "Paramedic", category: "Airway", text: "Post-intubation, a right mainstem intubation most commonly presents as:", options: ["Equal breath sounds", "Absent left breath sounds", "Wheezing bilaterally", "High SpO2 always", "Bradycardia only"], correctIndex: 1, explanation: "Right mainstem placement causes diminished/absent breath sounds on the left." },
  { id: 493, level: "Paramedic", category: "Airway", text: "A patient aspirates and develops sudden hypoxia with coarse crackles. Immediate airway action is:", options: ["Give oral glucose", "Suction and optimize oxygenation/ventilation", "Give aspirin", "Give nitro", "Stop ventilations"], correctIndex: 1, explanation: "Clear the airway (suction) and support oxygenation/ventilation." },
  { id: 494, level: "Paramedic", category: "Airway", text: "A difficult BVM seal is best improved by:", options: ["One-person technique only", "Two-person BVM with airway adjunct and proper positioning", "No airway adjuncts ever", "Lower oxygen flow", "Tilting patient prone"], correctIndex: 1, explanation: "Two-person BVM and airway adjuncts improve seal and ventilation effectiveness." },
  { id: 495, level: "Paramedic", category: "Airway", text: "The best initial airway positioning for most adults is:", options: ["Chin-to-chest", "Sniffing position (when no c-spine concern)", "Head down", "Sitting slumped", "Left lateral always"], correctIndex: 1, explanation: "The sniffing position aligns airway axes and improves laryngoscopy/ventilation when trauma isn’t suspected." },
  { id: 496, level: "Paramedic", category: "Airway", text: "A patient’s ETCO2 is persistently 10 mmHg during CPR with good compressions. This most likely indicates:", options: ["Excellent perfusion", "Poor perfusion/low cardiac output during CPR", "Hyperglycemia", "Proper tube placement guarantee", "CO poisoning"], correctIndex: 1, explanation: "Very low ETCO2 during CPR often reflects poor perfusion; reassess compression quality and reversible causes." },
  { id: 497, level: "Paramedic", category: "Airway", text: "A ‘can’t intubate, can’t oxygenate’ situation requires:", options: ["More laryngoscopy attempts only", "Immediate surgical airway per protocol", "Oral glucose", "Aspirin", "Defibrillation"], correctIndex: 1, explanation: "When oxygenation cannot be maintained, proceed to emergency surgical airway per protocol." },
  { id: 498, level: "Paramedic", category: "Airway", text: "After successful intubation, the MOST important next step is:", options: ["Remove the tube to re-check", "Secure tube and confirm with waveform capnography", "Give aspirin", "Stop monitoring", "Hyperventilate immediately"], correctIndex: 1, explanation: "Secure the tube and confirm placement continuously; prevent dislodgement." },
  { id: 499, level: "Paramedic", category: "Airway", text: "A patient with COPD exacerbation is tiring and CO2 is rising. Best airway decision is:", options: ["Delay ventilation to avoid CO2 retention", "Assist ventilation (BVM/advanced airway as needed) and treat cause", "Only give fluids", "Only give aspirin", "Only give nitro"], correctIndex: 1, explanation: "Impending respiratory failure requires ventilatory support while treating bronchospasm." },
  { id: 500, level: "Paramedic", category: "Airway", text: "In intubated patients, the best reason to avoid over-ventilation is:", options: ["It improves blood pressure", "It can decrease venous return and worsen perfusion", "It always lowers ICP safely", "It improves oxygenation without downside", "It reduces aspiration risk"], correctIndex: 1, explanation: "Excessive ventilation increases intrathoracic pressure, reducing preload and perfusion." },

  // 3) Cardiology (Paramedic) — 501–525
  { id: 501, level: "Paramedic", category: "Cardiology", text: "A patient is pulseless with VF on the monitor. The next action is:", options: ["Synchronized cardioversion", "Immediate defibrillation and CPR", "Adenosine", "Atropine", "Vagal maneuvers"], correctIndex: 1, explanation: "VF/pulseless VT require immediate defibrillation and high-quality CPR." },
  { id: 502, level: "Paramedic", category: "Cardiology", text: "A stable narrow-complex tachycardia at 180 bpm with regular rhythm is most appropriately treated first with:", options: ["Defibrillation", "Vagal maneuvers and adenosine per protocol", "Amiodarone infusion immediately", "Magnesium", "Unsynchronized shock"], correctIndex: 1, explanation: "Stable regular narrow SVT is treated with vagal maneuvers then adenosine per ACLS/protocol." },
  { id: 503, level: "Paramedic", category: "Cardiology", text: "An unstable patient with SVT (altered, hypotensive) requires:", options: ["Adenosine first", "Synchronized cardioversion", "Diltiazem only", "Observation", "Oral fluids"], correctIndex: 1, explanation: "Unstable tachyarrhythmias require immediate synchronized cardioversion." },
  { id: 504, level: "Paramedic", category: "Cardiology", text: "A patient has symptomatic bradycardia with hypotension and poor perfusion. First-line ACLS medication is:", options: ["Adenosine", "Atropine", "Amiodarone", "Diltiazem", "Magnesium"], correctIndex: 1, explanation: "Atropine is first-line for symptomatic bradycardia (then pacing/pressors if ineffective)." },
  { id: 505, level: "Paramedic", category: "Cardiology", text: "A patient is in torsades de pointes. The medication of choice is:", options: ["Calcium chloride", "Magnesium sulfate", "Adenosine", "Atropine", "Nitroglycerin"], correctIndex: 1, explanation: "Torsades is treated with magnesium sulfate and correction of underlying causes." },
  { id: 506, level: "Paramedic", category: "Cardiology", text: "A patient has wide-complex tachycardia with a pulse and is unstable. Best action is:", options: ["Adenosine", "Synchronized cardioversion", "Vagal maneuvers", "No treatment", "Oral aspirin"], correctIndex: 1, explanation: "Unstable tachycardia (including wide-complex) requires synchronized cardioversion." },
  { id: 507, level: "Paramedic", category: "Cardiology", text: "PEA is best described as:", options: ["A shockable rhythm", "Electrical activity without a palpable pulse", "Always VF", "A normal rhythm", "A type of SVT"], correctIndex: 1, explanation: "PEA is non-shockable; treat with CPR, epinephrine, and reversible causes." },
  { id: 508, level: "Paramedic", category: "Cardiology", text: "In asystole, the best next steps include:", options: ["Defibrillate immediately", "CPR, epinephrine, and treat reversible causes", "Adenosine", "Synchronized cardioversion", "Vagal maneuvers"], correctIndex: 1, explanation: "Asystole is non-shockable; prioritize CPR, epinephrine, and H’s & T’s." },
  { id: 509, level: "Paramedic", category: "Cardiology", text: "A patient has chest pain with ST elevation in contiguous leads. Prehospital priority is:", options: ["Delay transport for repeat ECGs for 30 minutes", "Rapid transport to PCI-capable facility with STEMI activation/pre-notification", "Give antibiotics", "Give adenosine", "Give furosemide always"], correctIndex: 1, explanation: "STEMI is time-critical; rapid PCI activation and transport improve outcomes." },
  { id: 510, level: "Paramedic", category: "Cardiology", text: "A patient is in AF with RVR (irregularly irregular, 160 bpm) and is stable. Management focuses on:", options: ["Immediate defibrillation", "Rate control per protocol and evaluation for anticoag/underlying causes", "Adenosine always", "Atropine", "Vagal maneuvers only"], correctIndex: 1, explanation: "Stable AF with RVR is managed with rate control per protocol and supportive care." },
  { id: 511, level: "Paramedic", category: "Cardiology", text: "For VF/pVT arrest, which medication is commonly given after shocks and CPR per ACLS?", options: ["Adenosine", "Amiodarone (or lidocaine) per protocol", "Diltiazem", "Atropine", "Nitroglycerin"], correctIndex: 1, explanation: "After defibrillation and CPR, antiarrhythmics like amiodarone are used for refractory VF/pVT per protocol." },
  { id: 512, level: "Paramedic", category: "Cardiology", text: "A paced rhythm with no capture means:", options: ["Pacer spikes followed by QRS consistently", "Pacer spikes without corresponding QRS complexes", "Normal sinus rhythm", "VF", "Asystole"], correctIndex: 1, explanation: "Failure to capture occurs when pacing spikes do not produce myocardial depolarization (no QRS)." },
  { id: 513, level: "Paramedic", category: "Cardiology", text: "A patient with symptomatic bradycardia does not respond to atropine. Next best intervention is:", options: ["Adenosine", "Transcutaneous pacing and/or vasopressors per protocol", "Defibrillation", "Cardioversion", "Magnesium"], correctIndex: 1, explanation: "If atropine fails, TCP and pressor support are indicated per ACLS/protocol." },
  { id: 514, level: "Paramedic", category: "Cardiology", text: "A patient has narrow QRS, regular rhythm at 50 bpm but is hypotensive and altered. The best treatment is:", options: ["No treatment because rate is slow", "Treat as symptomatic bradycardia (atropine/TCP/pressors)", "Adenosine", "Diltiazem", "Amiodarone bolus"], correctIndex: 1, explanation: "Symptoms (hypotension/AMS) define instability; treat the bradycardia." },
  { id: 515, level: "Paramedic", category: "Cardiology", text: "A patient has unstable polymorphic VT. The best electrical therapy is typically:", options: ["Synchronized cardioversion always", "Defibrillation (unsynchronized) if synchronization not possible", "No shocks", "Vagal maneuvers", "Aspirin only"], correctIndex: 1, explanation: "Polymorphic VT may not synchronize; treat as shockable with defibrillation if unstable." },
  { id: 516, level: "Paramedic", category: "Cardiology", text: "In a narrow-complex tachycardia, adenosine should be given:", options: ["Slow IV push without flush", "Rapid IV push followed by immediate flush", "IM injection", "Oral tablet", "Through a filter over 10 minutes"], correctIndex: 1, explanation: "Adenosine has a very short half-life; it must be given rapid IV push with flush." },
  { id: 517, level: "Paramedic", category: "Cardiology", text: "A patient is hypotensive with signs of shock and ECG shows ventricular tachycardia with a pulse. Best action is:", options: ["Adenosine", "Synchronized cardioversion", "Wait and reassess", "Oral fluids", "Atropine"], correctIndex: 1, explanation: "Unstable VT with a pulse requires synchronized cardioversion." },
  { id: 518, level: "Paramedic", category: "Cardiology", text: "The MOST common reversible causes to consider in PEA are summarized as:", options: ["FAST/BE-FAST", "H’s and T’s", "ABCDE", "SAMPLE", "OPQRST"], correctIndex: 1, explanation: "PEA management includes finding and treating H’s and T’s (reversible causes)." },
  { id: 519, level: "Paramedic", category: "Cardiology", text: "A patient with suspected ACS should receive aspirin unless contraindicated because it:", options: ["Raises BP", "Inhibits platelet aggregation", "Dilates bronchi", "Treats arrhythmias", "Lowers glucose"], correctIndex: 1, explanation: "Aspirin reduces clot progression by inhibiting platelet aggregation." },
  { id: 520, level: "Paramedic", category: "Cardiology", text: "A patient with inferior MI is hypotensive with clear lungs. The best initial management is often:", options: ["Diuretics", "Careful fluid bolus and avoid nitrates if RV infarct suspected", "High-dose nitro", "Beta-blocker immediately", "Adenosine"], correctIndex: 1, explanation: "RV infarct patients can be preload dependent; cautious fluids may improve BP, nitrates can worsen hypotension." },
  { id: 521, level: "Paramedic", category: "Cardiology", text: "A patient has sinus tachycardia at 130 due to fever/dehydration. Best treatment is:", options: ["Adenosine", "Treat underlying cause (fluids, cooling, etc.)", "Synchronized cardioversion", "Defibrillation", "Atropine"], correctIndex: 1, explanation: "Sinus tachycardia is usually compensatory—treat the cause, not the rhythm." },
  { id: 522, level: "Paramedic", category: "Cardiology", text: "Which rhythm is shockable?", options: ["Asystole", "PEA", "VF", "Sinus bradycardia", "1st-degree AV block"], correctIndex: 2, explanation: "VF (and pulseless VT) are shockable; asystole and PEA are not." },
  { id: 523, level: "Paramedic", category: "Cardiology", text: "A patient has a regular wide-complex tachycardia and you suspect SVT with aberrancy. A safe initial drug consideration in stable patients (per protocol) may be:", options: ["Atropine", "Adenosine in certain regular monomorphic wide tachycardias", "Furosemide", "Nitroglycerin", "Magnesium only"], correctIndex: 1, explanation: "Adenosine may be used for regular monomorphic wide tachycardia if stable and per protocol; avoid if irregular/polymorphic." },
    // 3) Cardiology (Paramedic) — continuing
  { id: 524, level: "Paramedic", category: "Cardiology", text: "The single most important factor that improves CPR effectiveness is:", options: ["Frequent rhythm checks", "Ventilating fast to raise SpO2 quickly", "Shallow compressions to avoid injury", "Long pauses to deliver breaths", "High-quality compressions with minimal interruptions"], correctIndex: 4, explanation: "Good CPR = correct rate/depth, full recoil, and minimal pauses to maintain perfusion." },
  { id: 525, level: "Paramedic", category: "Cardiology", text: "After ROSC, the best immediate oxygen strategy is:", options: ["Turn oxygen off completely", "NRB at 15 L/min forever", "Hyperventilate to ETCO2 20", "Titrate oxygen to normal saturation (avoid hyperoxia) while monitoring ventilation", "Give adenosine to prevent re-arrest"], correctIndex: 3, explanation: "Post-ROSC care prioritizes oxygenation/ventilation without excessive oxygen and avoids hyperventilation." },

  // 4) Trauma (Paramedic) — 526–585
  { id: 526, level: "Paramedic", category: "Trauma", text: "A trauma patient has weak radial pulses, cool clammy skin, and SBP 86. The best immediate priority is:", options: ["Delay transport to splint every injury", "Give oral fluids", "Keep the patient sitting upright", "Control life-threatening bleeding, manage airway/breathing, rapid transport", "Give aspirin for pain"], correctIndex: 3, explanation: "Treat shock and life threats first; minimize scene time for unstable trauma." },
  { id: 527, level: "Paramedic", category: "Trauma", text: "A pelvic fracture is suspected (high-energy MVC) with hypotension. Best immediate stabilization is:", options: ["Log roll repeatedly to check the back", "Apply traction splint to both legs", "High-flow O2 only", "Apply a pelvic binder/sheet at the greater trochanters and treat shock", "Elevate legs and delay transport"], correctIndex: 3, explanation: "Pelvic binding reduces pelvic volume/bleeding; pair with shock management and rapid transport." },
  { id: 528, level: "Paramedic", category: "Trauma", text: "A patient has paradoxical chest movement and severe pain after blunt trauma. Best management is:", options: ["Tight circumferential chest wrapping", "Encourage coughing to re-expand lung", "Give only a nasal cannula", "Support ventilation/oxygenation; consider PPV if failing and treat pain per protocol", "Abdominal thrusts"], correctIndex: 3, explanation: "Flail chest can cause respiratory failure; oxygenation/ventilation support and analgesia improve breathing." },
  { id: 529, level: "Paramedic", category: "Trauma", text: "A trauma patient has unequal chest rise and absent breath sounds on the left with hypotension. Most likely life threat is:", options: ["Pulmonary embolism", "Cardiac tamponade", "Simple anxiety", "Tension pneumothorax", "Asthma"], correctIndex: 3, explanation: "Unilateral absent sounds + shock strongly suggests tension pneumothorax (treat per protocol)." },
  { id: 530, level: "Paramedic", category: "Trauma", text: "A patient with suspected tension pneumothorax is decompressed but remains in severe distress. Best next step is:", options: ["Assume it worked and stop reassessing", "Give aspirin", "Switch to low-flow oxygen only", "Reassess placement and consider repeat decompression/definitive chest access per protocol", "Place in Trendelenburg"], correctIndex: 3, explanation: "If no improvement, reassess and re-intervene per protocol; needle failure/occlusion can occur." },
  { id: 531, level: "Paramedic", category: "Trauma", text: "A patient has massive facial trauma with blood in the airway and ineffective BVM. Best next airway move is:", options: ["Keep trying one-person BVM only", "Delay airway until hospital", "Give nitroglycerin", "Use aggressive suction + two-person BVM and move to a rescue airway per protocol", "Give oral glucose"], correctIndex: 3, explanation: "Airway control requires suction, seal optimization, and rapid escalation when BVM fails." },
  { id: 532, level: "Paramedic", category: "Trauma", text: "A trauma patient has hypotension, bradycardia, and warm dry skin. This pattern is most consistent with:", options: ["Hypovolemic shock", "Cardiogenic shock", "Obstructive shock", "Neurogenic shock", "Septic shock"], correctIndex: 3, explanation: "Neurogenic shock causes hypotension with bradycardia and warm skin due to loss of sympathetic tone." },
  { id: 533, level: "Paramedic", category: "Trauma", text: "In suspected spinal injury, the best movement strategy is:", options: ["Twist the torso to reduce pain", "Sit patient up quickly", "Allow the patient to walk to the stretcher", "Move as a unit with manual stabilization and minimal movement", "Remove c-collar to improve comfort"], correctIndex: 3, explanation: "Minimize spinal movement; move the patient as a unit with stabilization." },
  { id: 534, level: "Paramedic", category: "Trauma", text: "A patient has a penetrating neck wound with bubbling air and respiratory distress. Best immediate management is:", options: ["Pack the wound tightly with gauze", "Remove any embedded object", "Do nothing until ALS arrives", "Apply an occlusive dressing and monitor airway/ventilation closely", "Give oral fluids"], correctIndex: 3, explanation: "Occlusive dressing helps prevent air entrainment; airway monitoring is critical with neck trauma." },
  { id: 535, level: "Paramedic", category: "Trauma", text: "A trauma patient has muffled heart tones, hypotension, and JVD. Most likely diagnosis is:", options: ["Tension pneumothorax", "Hemothorax", "COPD exacerbation", "Cardiac tamponade", "Hypoglycemia"], correctIndex: 3, explanation: "Beck’s triad suggests tamponade—rapid transport and shock support." },
  { id: 536, level: "Paramedic", category: "Trauma", text: "A patient has profuse extremity bleeding not controlled by pressure. The best next action is:", options: ["Elevate only", "Apply ice and wait", "Use pressure points only", "Apply a tourniquet proximal to the wound and tighten until bleeding stops", "Loosen every 5 minutes"], correctIndex: 3, explanation: "Life-threatening bleeding requires tourniquet use when direct pressure fails; do not periodically loosen." },
  { id: 537, level: "Paramedic", category: "Trauma", text: "A patient has an impaled object in the thigh. Best care is:", options: ["Remove it quickly", "Push it deeper to stabilize", "Cut it flush with skin", "Stabilize in place with bulky dressings and control bleeding around it", "Ignore bleeding if distal pulse present"], correctIndex: 3, explanation: "Do not remove impaled objects; stabilize and manage hemorrhage around it." },
  { id: 538, level: "Paramedic", category: "Trauma", text: "A patient with a head injury has SBP 84 and signs of shock. The MOST important physiologic target is to avoid:", options: ["Mild pain", "Mild tachycardia", "Mild nausea", "Hypotension and hypoxia", "Normal ETCO2"], correctIndex: 3, explanation: "In TBI, hypotension and hypoxia dramatically worsen outcomes—prioritize oxygenation and perfusion." },
  { id: 539, level: "Paramedic", category: "Trauma", text: "A patient has severe burns and soot in the mouth with hoarse voice. Best airway plan is:", options: ["Wait for swelling to occur", "Use CPAP only", "Give oral fluids", "Prepare for early airway control/advanced management per protocol", "Avoid oxygen"], correctIndex: 3, explanation: "Inhalation injury can swell rapidly; early airway planning prevents failure later." },
  { id: 540, level: "Paramedic", category: "Trauma", text: "For an open chest wound (“sucking chest wound”), the best dressing is:", options: ["Dry gauze only", "Wet gauze taped on all sides", "Pressure bandage with elastic wrap", "Occlusive dressing (vented if available) and monitor for tension", "Tourniquet over the chest"], correctIndex: 3, explanation: "Seal the wound to prevent air entry; reassess for tension pneumothorax." },
  { id: 541, level: "Paramedic", category: "Trauma", text: "A patient has crush injury to a limb for 2 hours and now becomes hypotensive after release. The key concern is:", options: ["Hypoglycemia", "Pulmonary embolism", "Stroke", "Hyperkalemia/acidosis from crush syndrome", "Appendicitis"], correctIndex: 3, explanation: "Crush syndrome can cause lethal hyperkalemia and shock after reperfusion—treat per protocol." },
  { id: 542, level: "Paramedic", category: "Trauma", text: "A trauma patient is breathing 6/min and shallow with a pulse. The best action is:", options: ["Nasal cannula only", "NRB only", "Wait for ALS", "Assist ventilations with BVM and high-flow oxygen", "Give aspirin"], correctIndex: 3, explanation: "Inadequate ventilation is immediately life-threatening; provide assisted ventilations." },
  { id: 543, level: "Paramedic", category: "Trauma", text: "A patient has severe abdominal trauma and is tachycardic with falling BP. The most likely cause is:", options: ["Anxiety", "Asthma", "Allergic reaction", "Internal hemorrhage", "Hyperventilation syndrome"], correctIndex: 3, explanation: "Blunt abdominal trauma commonly causes internal bleeding leading to shock." },
  { id: 544, level: "Paramedic", category: "Trauma", text: "A patient’s trachea deviates away from the injured side with severe distress. This finding most supports:", options: ["Simple pneumothorax", "Pulmonary contusion", "Rib fracture", "Tension pneumothorax", "Bronchitis"], correctIndex: 3, explanation: "Tracheal deviation is a late sign of tension pneumothorax." },
  { id: 545, level: "Paramedic", category: "Trauma", text: "A trauma patient has massive hemoptysis and unilateral dullness to percussion with shock. Most likely is:", options: ["Asthma", "CHF", "Pneumonia", "Hemothorax", "Hyperventilation"], correctIndex: 3, explanation: "Hemothorax can cause shock with blood loss into the chest." },
  { id: 546, level: "Paramedic", category: "Trauma", text: "A patient with suspected open fracture has bone visible. Best immediate care is:", options: ["Push bone back in", "Scrub aggressively", "Leave uncovered to dry", "Control bleeding, cover with sterile dressing, immobilize, transport", "Apply heat pack"], correctIndex: 3, explanation: "Cover, control bleeding, immobilize, and transport—do not push bone back in." },
  { id: 547, level: "Paramedic", category: "Trauma", text: "A trauma patient is hypothermic in the field. The key reason this is dangerous is:", options: ["It improves clotting", "It reduces bleeding always", "It makes pain go away", "It worsens coagulopathy and shock", "It prevents infection"], correctIndex: 3, explanation: "Hypothermia worsens clotting and contributes to the trauma triad (hypothermia, acidosis, coagulopathy)." },
  { id: 548, level: "Paramedic", category: "Trauma", text: "A patient has severe bleeding from an amputation. After applying a tourniquet, the next best step is:", options: ["Loosen it to check pulses", "Remove it once bleeding slows", "Ignore the patient’s temperature", "Document time applied and reassess bleeding/perfusion frequently", "Give oral fluids"], correctIndex: 3, explanation: "Record tourniquet time and reassess for continued hemorrhage while treating shock." },
  { id: 549, level: "Paramedic", category: "Trauma", text: "A patient has traumatic cardiac arrest after blunt trauma. A high-yield reversible cause to address is:", options: ["Migraine", "Hyperglycemia", "Otitis media", "Tension pneumothorax (and massive hemorrhage) per protocol", "GERD"], correctIndex: 3, explanation: "Traumatic arrest commonly involves hemorrhage and tension pneumothorax—treat reversible causes rapidly." },
  { id: 550, level: "Paramedic", category: "Trauma", text: "A trauma patient has severe pain and anxiety but is perfusing well. Analgesia is best described as:", options: ["Never allowed prehospital", "Only after hospital arrival", "Always contraindicated in trauma", "Often appropriate per protocol while monitoring BP/respirations", "Given only if unconscious"], correctIndex: 3, explanation: "Pain control can improve ventilation and cooperation; monitor for hypotension/respiratory depression." },
  { id: 551, level: "Paramedic", category: "Trauma", text: "A patient with head trauma is vomiting repeatedly. The biggest immediate risk is:", options: ["Dehydration only", "Stroke", "Hyperglycemia", "Aspiration and airway compromise", "Hypertension"], correctIndex: 3, explanation: "Repeated vomiting threatens airway protection; position/suction and manage airway." },
  { id: 552, level: "Paramedic", category: "Trauma", text: "A patient has signs of basilar skull fracture (CSF leak, Battle sign). Best airway adjunct approach is:", options: ["NPA is preferred", "Insert NPA deeper for patency", "No airway maneuvers", "Avoid NPA; use positioning/OPA if no gag and ventilate as needed", "Oral glucose"], correctIndex: 3, explanation: "Basilar skull fracture is a contraindication to nasal airway insertion." },
  { id: 553, level: "Paramedic", category: "Trauma", text: "A patient has burns to the face and circumferential neck swelling. Primary concern is:", options: ["Renal failure first", "GI bleed", "Hyperglycemia", "Airway compromise from edema", "Sprain"], correctIndex: 3, explanation: "Facial/neck burns can rapidly swell and obstruct the airway—plan early airway control." },
  { id: 554, level: "Paramedic", category: "Trauma", text: "A patient with suspected spinal injury is found sitting in a vehicle. Best extrication is:", options: ["Pull them out by the arms", "Have them stand and pivot", "Remove collar to reduce pain", "Controlled movement with manual stabilization and minimal spinal motion per protocol", "Delay all care"], correctIndex: 3, explanation: "Extrication should minimize spinal movement while addressing immediate life threats." },
  { id: 555, level: "Paramedic", category: "Trauma", text: "A patient has a flail chest and worsening hypoxia. The best ventilatory support if failing is:", options: ["Paper bag breathing", "Blow-by oxygen", "Room air to avoid CO2 retention", "Positive pressure ventilation (BVM/advanced airway) as needed", "Oral glucose"], correctIndex: 3, explanation: "PPV may be required when ventilatory failure develops." },
  { id: 556, level: "Paramedic", category: "Trauma", text: "A patient has a large scalp laceration with heavy bleeding. Best first action is:", options: ["Tourniquet on the neck", "Ignore bleeding; scalp bleeds a lot", "Irrigate for 10 minutes first", "Direct pressure with dressing and rapid control of hemorrhage", "Give aspirin"], correctIndex: 3, explanation: "Scalp wounds can bleed significantly—control hemorrhage promptly." },
  { id: 557, level: "Paramedic", category: "Trauma", text: "A trauma patient has an amputated hand. Best packaging for the part is:", options: ["Directly on ice", "Soak in alcohol", "Leave exposed to air", "Wrap in moist sterile gauze, seal in bag, cool bag (do not freeze)", "Scrub with antiseptic and tape to patient"], correctIndex: 3, explanation: "Protect tissue and cool indirectly to preserve viability." },
  { id: 558, level: "Paramedic", category: "Trauma", text: "A patient has an eye impaled by metal. Best care is:", options: ["Remove the object", "Apply pressure directly on globe", "Irrigate aggressively", "Stabilize object, cover both eyes, transport", "Give oral glucose"], correctIndex: 3, explanation: "Do not remove; stabilize and prevent eye movement by covering both eyes." },
  { id: 559, level: "Paramedic", category: "Trauma", text: "A patient with severe burns is shivering and cold. Best action is:", options: ["Expose burns to air for cooling", "Give cold IV fluids only", "Delay transport", "Prevent heat loss (warm blankets, warm environment) while treating burns", "Ice packs everywhere"], correctIndex: 3, explanation: "Burn patients lose heat easily; hypothermia worsens outcomes." },
  { id: 560, level: "Paramedic", category: "Trauma", text: "A patient has suspected compartment syndrome (pain out of proportion, tense limb). Best EMS action is:", options: ["Apply tight circumferential wrap", "Massage the limb", "Delay transport for reassessment", "Splint, keep at heart level, rapid transport, monitor perfusion", "Apply heat pack"], correctIndex: 3, explanation: "Compartment syndrome is surgical; avoid constriction and transport rapidly." },
  { id: 561, level: "Paramedic", category: "Trauma", text: "A trauma patient has signs of shock but lungs are clear and no JVD. Most likely cause is:", options: ["Cardiogenic shock", "Anaphylaxis", "Neurogenic shock", "Hemorrhagic shock", "Pulmonary edema"], correctIndex: 3, explanation: "In trauma, shock is hemorrhage until proven otherwise." },
  { id: 562, level: "Paramedic", category: "Trauma", text: "A patient has a forearm fracture with no distal pulse after splinting. Next best step is:", options: ["Leave splint as is and ignore", "Tighten splint more", "Give aspirin", "Reassess and loosen/realign per protocol to restore perfusion, rapid transport", "Apply tourniquet"], correctIndex: 3, explanation: "Loss of distal perfusion requires immediate reassessment and correction of splinting/position." },
  { id: 563, level: "Paramedic", category: "Trauma", text: "A patient is ejected from a vehicle and has unequal pupils. The most important prehospital goal is:", options: ["Lower BP aggressively", "Hyperventilate to ETCO2 15 immediately", "Delay transport for full neuro exam", "Maintain oxygenation and adequate perfusion, rapid transport", "Give aspirin"], correctIndex: 3, explanation: "Prevent secondary brain injury by avoiding hypoxia/hypotension and minimizing delay." },
  { id: 564, level: "Paramedic", category: "Trauma", text: "A patient has suspected abdominal evisceration. Best dressing is:", options: ["Dry gauze only", "Tightly pack organs back in", "Leave exposed to air", "Moist sterile dressing with occlusive cover and prevent heat loss", "Tourniquet"], correctIndex: 3, explanation: "Keep tissues moist and covered; do not reinsert organs." },
  { id: 565, level: "Paramedic", category: "Trauma", text: "A patient has a severe mechanism and is anticoagulated. Your suspicion for head bleed should be:", options: ["Lower than normal", "Impossible if no external trauma", "Only if GCS is 3", "Higher even with minor head strike; monitor closely and transport", "Zero if pupils are equal"], correctIndex: 3, explanation: "Anticoagulants raise risk of intracranial hemorrhage after minor trauma." },
  { id: 566, level: "Paramedic", category: "Trauma", text: "A patient has partial airway obstruction from blood. Best immediate action is:", options: ["Blind finger sweep", "Give water", "Insert NPA first", "Suction and position, then ventilate as needed", "Give aspirin"], correctIndex: 3, explanation: "Clear the airway first—suction and positioning are key." },
  { id: 567, level: "Paramedic", category: "Trauma", text: "A patient has extensive burns with tachycardia and hypotension. Most likely cause is:", options: ["Cardiogenic shock", "Neurogenic shock", "Obstructive shock", "Hypovolemic shock from fluid loss", "Hypertensive crisis"], correctIndex: 3, explanation: "Burns cause major capillary leak and fluid loss leading to hypovolemia." },
  { id: 568, level: "Paramedic", category: "Trauma", text: "A trauma patient has sudden respiratory distress after long-bone fracture and petechiae. Most likely is:", options: ["Asthma", "CHF", "Pneumonia", "Fat embolism syndrome", "Appendicitis"], correctIndex: 3, explanation: "Fat embolism can follow long-bone fractures causing hypoxia and petechial rash." },
  { id: 569, level: "Paramedic", category: "Trauma", text: "In blast injuries, the organ system most sensitive to primary blast is:", options: ["Skin", "Muscle", "Bone", "Lungs and hollow organs", "Teeth"], correctIndex: 3, explanation: "Primary blast affects air-containing organs—lungs and GI tract are high risk." },
  { id: 570, level: "Paramedic", category: "Trauma", text: "A patient has penetrating trauma to the abdomen and is hypotensive. Best fluid goal is:", options: ["Normalize BP to 180 systolic", "No fluids ever", "Give oral fluids", "Permissive hypotension per protocol until definitive hemorrhage control", "Dextrose only"], correctIndex: 3, explanation: "Some systems use permissive hypotension to avoid dislodging clots (per protocol)." },
  { id: 571, level: "Paramedic", category: "Trauma", text: "A patient has suspected internal bleeding and altered mental status. Best transport decision is:", options: ["Non-emergent transport", "Wait for family consent", "Walk to the ambulance", "Rapid transport to trauma center with pre-notification", "Refuse transport if patient is confused"], correctIndex: 3, explanation: "Shock/AMS after trauma = high acuity; go rapidly to trauma-capable facility." },
  { id: 572, level: "Paramedic", category: "Trauma", text: "A patient has a fractured femur with significant deformity and pain. The best immobilization tool is:", options: ["Soft sling only", "Rigid board under back only", "Pelvic binder on chest", "Traction splint if indicated and no contraindications", "No splinting"], correctIndex: 3, explanation: "Traction splints reduce pain and bleeding in isolated mid-shaft femur fractures when appropriate." },
  { id: 573, level: "Paramedic", category: "Trauma", text: "A contraindication to traction splint is:", options: ["Mid-shaft femur fracture", "Intact distal pulse", "Pain relief", "Suspected pelvic/hip fracture", "Isolated femur deformity"], correctIndex: 3, explanation: "Traction can worsen pelvic/hip injuries; avoid if pelvis/hip injury suspected." },
  { id: 574, level: "Paramedic", category: "Trauma", text: "A patient has suspected hemothorax and needs ventilation support. Best ventilation approach is:", options: ["Hyperventilate rapidly", "Avoid oxygen", "Only nasal cannula", "Support oxygenation/ventilation while minimizing interruptions and transport", "Give aspirin"], correctIndex: 3, explanation: "Treat ABCs and transport; definitive chest drainage is hospital-based." },
  { id: 575, level: "Paramedic", category: "Trauma", text: "A patient has a chemical burn. The best immediate treatment is:", options: ["Apply ointment", "Neutralize with household chemicals", "Cover dry and transport without rinsing", "Brush off dry chemical and irrigate copiously with water", "Ice pack for 30 minutes"], correctIndex: 3, explanation: "Remove contaminant and irrigate thoroughly; do not attempt chemical neutralization." },
  { id: 576, level: "Paramedic", category: "Trauma", text: "A patient with traumatic amputation is pale and anxious but talking. The most important early therapy is:", options: ["Wait for hypotension before acting", "Pain meds only", "Give oral fluids", "Hemorrhage control and shock prevention (warmth, oxygen as needed, rapid transport)", "Delay tourniquet"], correctIndex: 3, explanation: "Control bleeding early and prevent shock; hypotension is a late sign." },
  { id: 577, level: "Paramedic", category: "Trauma", text: "A trauma patient becomes suddenly hypotensive after positive pressure ventilation. A key cause to suspect is:", options: ["Hypoglycemia", "Anxiety", "Seizure", "Tension pneumothorax worsened by PPV", "Otitis"], correctIndex: 3, explanation: "PPV can worsen tension pneumothorax—reassess breath sounds and treat per protocol." },
  { id: 578, level: "Paramedic", category: "Trauma", text: "A patient with major trauma has ETCO2 18 and weak pulses. This most indicates:", options: ["Excellent perfusion", "Hyperglycemia", "Normal physiology", "Poor perfusion/shock", "Over-oxygenation"], correctIndex: 3, explanation: "Low ETCO2 with shock signs suggests low perfusion/cardiac output." },
  { id: 579, level: "Paramedic", category: "Trauma", text: "A patient has suspected cervical spine injury and needs airway opening. Best maneuver is:", options: ["Head-tilt chin-lift", "Neck flexion", "Tongue pull", "Jaw-thrust with manual stabilization", "Valsalva"], correctIndex: 3, explanation: "Jaw-thrust minimizes cervical movement while opening the airway." },
  { id: 580, level: "Paramedic", category: "Trauma", text: "A patient has a deep laceration with arterial spurting. Best control sequence is:", options: ["Elevation only", "Pressure points only", "Ice pack only", "Direct pressure → wound packing/hemostatic gauze (if allowed) → tourniquet if needed", "Wait for hospital"], correctIndex: 3, explanation: "Escalate hemorrhage control rapidly when bleeding is life-threatening." },
  { id: 581, level: "Paramedic", category: "Trauma", text: "A patient has suspected internal bleeding and is in shock. The most important field “treatment” is:", options: ["Definitive surgical control", "Long on-scene stabilization", "Repeated neuro exams", "Rapid transport to definitive care with ongoing shock management", "Oral pain meds"], correctIndex: 3, explanation: "Definitive hemorrhage control is surgical—transport is the key intervention." },
  { id: 582, level: "Paramedic", category: "Trauma", text: "A patient with blunt trauma has new severe chest pain and dyspnea; lung sounds are equal. A key diagnosis to consider is:", options: ["Only asthma", "Only GERD", "Only pneumonia", "Myocardial contusion/cardiac injury", "Appendicitis"], correctIndex: 3, explanation: "Blunt chest trauma can injure the heart; monitor ECG and perfusion." },
  { id: 583, level: "Paramedic", category: "Trauma", text: "A trauma patient’s BP is normal but they are tachycardic and pale. This most suggests:", options: ["No shock", "Recovered shock", "Cardiogenic shock only", "Compensated shock", "Hyperglycemia"], correctIndex: 3, explanation: "Early shock can be compensated; tachycardia and skin signs can precede hypotension." },
  { id: 584, level: "Paramedic", category: "Trauma", text: "In blunt trauma, the most common cause of preventable death in the first minutes is:", options: ["Infection", "Renal failure", "Stroke", "Airway obstruction and uncontrolled hemorrhage", "Diabetes"], correctIndex: 3, explanation: "Early trauma deaths are often from airway compromise and hemorrhage—treat immediately." },
  { id: 585, level: "Paramedic", category: "Trauma", text: "A patient with suspected tension pneumothorax improves after decompression. The best next action is:", options: ["Remove the catheter immediately", "Stop oxygen", "Delay transport for paperwork", "Continue monitoring for recurrence and transport rapidly", "Give aspirin"], correctIndex: 3, explanation: "Decompression is temporary; ongoing monitoring and rapid transport are required." },

  // 5) Medical & OBGYN (Paramedic) — 586–645
  { id: 586, level: "Paramedic", category: "Medical & OBGYN", text: "A patient has suspected opioid overdose: pinpoint pupils, RR 4, shallow. Best priority is:", options: ["Naloxone before airway", "Wait for police", "Give oral glucose", "Ventilate with BVM + oxygen, then give naloxone per protocol", "Let them sleep it off"], correctIndex: 3, explanation: "Ventilation saves lives first; naloxone follows while maintaining airway control." },
  { id: 587, level: "Paramedic", category: "Medical & OBGYN", text: "A patient has hyperkalemia with ECG changes. The immediate stabilization medication that protects the myocardium is:", options: ["Dextrose only", "Albuterol only", "Sodium bicarbonate only", "Calcium (chloride/gluconate) per protocol", "Aspirin"], correctIndex: 3, explanation: "IV calcium stabilizes the cardiac membrane in severe hyperkalemia." },
  { id: 588, level: "Paramedic", category: "Medical & OBGYN", text: "A patient is febrile, hypotensive, altered, with suspected infection. The best initial treatment bundle is:", options: ["Diuretics", "Nitroglycerin", "Adenosine", "Oxygen as needed, IV fluids per protocol, early vasopressor if fluid-refractory, rapid transport", "High-dose beta blocker"], correctIndex: 3, explanation: "Septic shock requires perfusion support—fluids first, then pressors per protocol." },
  { id: 589, level: "Paramedic", category: "Medical & OBGYN", text: "A patient has wheezing, urticaria, and hypotension after shellfish. First-line medication is:", options: ["Diphenhydramine only", "Albuterol only", "Steroid only", "Epinephrine IM (then adjuncts) per protocol", "Furosemide"], correctIndex: 3, explanation: "Anaphylaxis with hypotension/respiratory involvement requires epinephrine first." },
  { id: 590, level: "Paramedic", category: "Medical & OBGYN", text: "A patient has diabetic emergency with glucose 32 and is seizing. Best immediate therapy is:", options: ["Insulin", "Oral glucose gel", "Nitroglycerin", "IV dextrose (or glucagon if no IV) per protocol while managing airway", "Aspirin"], correctIndex: 3, explanation: "Severe hypoglycemia with altered/seizing needs parenteral glucose and airway support." },
  { id: 591, level: "Paramedic", category: "Medical & OBGYN", text: "A patient has DKA signs: Kussmaul respirations, fruity breath, dehydration. The best prehospital focus is:", options: ["Give insulin bolus", "Give furosemide", "Give aspirin", "Support airway/breathing, IV fluids per protocol, rapid transport", "Give nitro"], correctIndex: 3, explanation: "DKA is treated definitively in hospital; prehospital care is perfusion/airway support and fluids per protocol." },
  { id: 592, level: "Paramedic", category: "Medical & OBGYN", text: "A patient has chest pain and ST elevation but also unequal arm BPs and tearing back pain. Best action is:", options: ["Give heparin routinely", "Give thrombolytics prehospital", "Ignore BP difference", "Suspect aortic dissection and transport emergently; avoid routine anticoag/antiplatelet decisions beyond protocol", "Delay transport"], correctIndex: 3, explanation: "Dissection can mimic MI; rapid transport and careful medication decisions are critical." },
  { id: 593, level: "Paramedic", category: "Medical & OBGYN", text: "A patient has status epilepticus (continuous seizure activity). After airway/oxygen, first-line med is:", options: ["Aspirin", "Furosemide", "Atropine", "Benzodiazepine (e.g., midazolam/lorazepam) per protocol", "Adenosine"], correctIndex: 3, explanation: "Benzodiazepines are first-line for ongoing seizure activity." },
  { id: 594, level: "Paramedic", category: "Medical & OBGYN", text: "A patient has suspected meningitis (fever, stiff neck, AMS). Best EMS approach is:", options: ["Delay transport for full neuro workup", "Give antibiotics only", "Give nitro", "Protect yourself (PPE), support ABCs, rapid transport", "Give oral glucose"], correctIndex: 3, explanation: "Treat ABCs and transport; use PPE due to infectious risk." },
  { id: 595, level: "Paramedic", category: "Medical & OBGYN", text: "A patient has acute pulmonary edema: severe dyspnea, crackles, HTN. Best initial support is:", options: ["Large fluid bolus", "Morphine first", "No oxygen", "CPAP and nitrates per protocol if BP supports", "Adenosine"], correctIndex: 3, explanation: "CPAP improves oxygenation and reduces preload/afterload; nitrates help when not hypotensive." },
  { id: 596, level: "Paramedic", category: "Medical & OBGYN", text: "A patient has severe COPD exacerbation with rising CO2 and fatigue. Best next step is:", options: ["Stop oxygen completely", "Hyperventilate at 30/min", "Give diuretics", "Ventilatory support (NIV/PPV as needed) and bronchodilator therapy per protocol", "Give aspirin"], correctIndex: 3, explanation: "Impending failure requires assisted ventilation plus treatment of bronchospasm." },
  { id: 597, level: "Paramedic", category: "Medical & OBGYN", text: "A patient has suspected organophosphate poisoning (SLUDGE, bronchorrhea). Best antidote approach is:", options: ["Naloxone only", "Aspirin", "Epinephrine only", "Atropine (and pralidoxime if carried) per protocol + airway suction/oxygen", "Nitro"], correctIndex: 3, explanation: "Cholinergic toxidrome needs atropine and aggressive airway secretion management." },
  { id: 598, level: "Paramedic", category: "Medical & OBGYN", text: "A patient is agitated, hot, tachycardic, with dry skin and dilated pupils. Most consistent toxidrome is:", options: ["Cholinergic", "Opioid", "Sedative-hypnotic", "Anticholinergic", "Anaphylaxis"], correctIndex: 3, explanation: "Anticholinergic = hot, dry, tachy, mydriasis, delirium." },
  { id: 599, level: "Paramedic", category: "Medical & OBGYN", text: "A patient has suspected beta-blocker overdose with bradycardia and hypotension. Key antidote is often:", options: ["Adenosine", "Furosemide", "Aspirin", "Glucagon per protocol", "Nitro"], correctIndex: 3, explanation: "Glucagon can improve heart rate/contractility in beta-blocker toxicity (per protocol)." },
  { id: 600, level: "Paramedic", category: "Medical & OBGYN", text: "A patient has suspected calcium channel blocker overdose (bradycardia, hypotension). First priorities include:", options: ["Nitro", "Adenosine", "Diuretics", "Airway/ventilation support and aggressive perfusion support (fluids/pressors) per protocol", "Aspirin"], correctIndex: 3, explanation: "CCB overdose can cause profound shock—support ABCs and circulation aggressively per protocol." },
  { id: 601, level: "Paramedic", category: "Medical & OBGYN", text: "A patient has acute stroke symptoms; glucose is 110. Best prehospital action is:", options: ["Give aspirin immediately to all", "Delay transport to see if it resolves", "Give nitro for BP control", "Rapid transport to stroke center with last-known-well time and pre-notification", "Give oral glucose anyway"], correctIndex: 3, explanation: "Time to stroke therapy is critical—transport and pre-notify with accurate onset time." },
  { id: 602, level: "Paramedic", category: "Medical & OBGYN", text: "A postpartum patient has heavy vaginal bleeding and signs of shock. Most likely cause is:", options: ["Hypoglycemia", "Stroke", "Pulmonary edema", "Postpartum hemorrhage (often uterine atony)", "Asthma"], correctIndex: 3, explanation: "Postpartum hemorrhage is life-threatening; treat shock and manage bleeding per protocol." },
  { id: 603, level: "Paramedic", category: "Medical & OBGYN", text: "A pregnant patient (3rd trimester) is supine and becomes hypotensive. Best immediate positioning is:", options: ["Prone", "Trendelenburg", "High Fowler", "Left lateral tilt/manual uterine displacement", "Sit cross-legged"], correctIndex: 3, explanation: "Left tilt relieves aortocaval compression and improves venous return." },
  { id: 604, level: "Paramedic", category: "Medical & OBGYN", text: "A pregnant patient has seizure activity and hypertension. Most likely diagnosis is:", options: ["Hypoglycemia", "Stroke", "Opioid overdose", "Eclampsia", "Asthma"], correctIndex: 3, explanation: "Seizure + HTN in pregnancy suggests eclampsia; treat per protocol." },
  { id: 605, level: "Paramedic", category: "Medical & OBGYN", text: "Medication of choice for eclamptic seizure prophylaxis/management is:", options: ["Calcium chloride", "Atropine", "Adenosine", "Magnesium sulfate per protocol", "Nitro"], correctIndex: 3, explanation: "Magnesium sulfate is the key therapy for eclampsia." },
  { id: 606, level: "Paramedic", category: "Medical & OBGYN", text: "A newborn is delivered limp with no respirations. First step after warming/drying/stimulation is:", options: ["Chest compressions immediately", "Epinephrine immediately", "Intubate immediately", "Begin positive pressure ventilation (PPV)", "Naloxone"], correctIndex: 3, explanation: "Neonatal resuscitation begins with effective ventilation when apneic." },
  { id: 607, level: "Paramedic", category: "Medical & OBGYN", text: "A newborn has HR 80 after 30 seconds of effective PPV. Next step is:", options: ["Stop PPV", "Epinephrine now", "Chest compressions now", "Continue PPV and reassess; compressions start if HR < 60", "Give aspirin"], correctIndex: 3, explanation: "HR 60–99: continue ventilation and reassess; compressions are for HR < 60." },
  { id: 608, level: "Paramedic", category: "Medical & OBGYN", text: "A shoulder dystocia occurs during delivery (head delivers, then retracts). Best immediate maneuver is:", options: ["Pull harder on the head", "Push the baby back in", "Delay for transport without action", "McRoberts maneuver with suprapubic pressure", "Fundal pressure"], correctIndex: 3, explanation: "McRoberts + suprapubic pressure helps free the impacted shoulder; avoid fundal pressure/pulling." },
  { id: 609, level: "Paramedic", category: "Medical & OBGYN", text: "A prolapsed umbilical cord is seen. Best immediate action is:", options: ["Pull on the cord", "Clamp and cut immediately", "Delay until hospital", "Relieve pressure by elevating presenting part and position mother knee-chest; rapid transport", "Give nitro"], correctIndex: 3, explanation: "Maintain cord perfusion by relieving compression and transporting emergently." },
  { id: 610, level: "Paramedic", category: "Medical & OBGYN", text: "A pregnant patient has severe lower abdominal pain and vaginal bleeding in late pregnancy. Most concerning diagnosis is:", options: ["GERD", "Round ligament pain", "Morning sickness", "Placental abruption", "UTI only"], correctIndex: 3, explanation: "Painful bleeding in late pregnancy suggests abruption; treat shock and transport emergently." },
  { id: 611, level: "Paramedic", category: "Medical & OBGYN", text: "Painless vaginal bleeding in late pregnancy is most concerning for:", options: ["Appendicitis", "Placental abruption", "Eclampsia", "Placenta previa", "Hyperventilation"], correctIndex: 3, explanation: "Placenta previa often causes painless bleeding; avoid vaginal exams and transport." },
  { id: 612, level: "Paramedic", category: "Medical & OBGYN", text: "A patient has suspected ectopic pregnancy: severe unilateral pelvic pain, syncope, hypotension. Best priority is:", options: ["Oral fluids", "Delay transport", "Give aspirin", "Treat shock and rapid transport (internal hemorrhage)", "Give nitro"], correctIndex: 3, explanation: "Ruptured ectopic can cause massive internal bleeding—treat shock and transport rapidly." },
  { id: 613, level: "Paramedic", category: "Medical & OBGYN", text: "A patient has asthma exacerbation and uses accessory muscles; SpO2 is falling. Best medication pathway is:", options: ["Aspirin only", "Nitro", "Atropine", "Bronchodilators + steroids/epi per protocol and consider assisted ventilation if failing", "Diuretics"], correctIndex: 3, explanation: "Severe asthma needs bronchodilation and escalation to ventilation support if tiring." },
  { id: 614, level: "Paramedic", category: "Medical & OBGYN", text: "A patient has suspected cyanide exposure (fire in enclosed space) and severe lactic acidosis signs. Best EMS approach is:", options: ["Delay transport", "Give aspirin", "Give adenosine", "High-flow oxygen, rapid transport, and antidote per protocol if available", "Only nasal cannula"], correctIndex: 3, explanation: "Enclosed fires risk CO/cyanide; prioritize oxygen and rapid definitive care (antidote if carried)." },
  { id: 615, level: "Paramedic", category: "Medical & OBGYN", text: "Carbon monoxide poisoning is best treated with:", options: ["Room air", "Paper bag breathing", "Furosemide", "High-flow oxygen (consider hyperbaric criteria via medical control)", "Aspirin"], correctIndex: 3, explanation: "High-flow oxygen speeds CO elimination and improves tissue oxygen delivery." },
  { id: 616, level: "Paramedic", category: "Medical & OBGYN", text: "A patient has severe hypothermia and appears pulseless. Best general rule is:", options: ["Declare immediately without attempts", "Do not start CPR in hypothermia", "Defibrillate endlessly with no CPR", "Start CPR if indicated and follow protocol; “not dead until warm and dead” principle", "Give oral fluids"], correctIndex: 3, explanation: "Severe hypothermia can mimic death; follow resuscitation protocol and prevent further heat loss." },
  { id: 617, level: "Paramedic", category: "Medical & OBGYN", text: "Heat stroke is best differentiated from heat exhaustion by:", options: ["Sweating always present", "Normal mental status", "Mild tachycardia only", "Altered mental status with very high temperature", "Cold skin"], correctIndex: 3, explanation: "Heat stroke is defined by CNS dysfunction and hyperthermia—treat as life-threatening." },
  { id: 618, level: "Paramedic", category: "Medical & OBGYN", text: "A patient with suspected GI bleed has coffee-ground emesis and tachycardia. Best priority is:", options: ["Give aspirin", "Give nitro", "Delay transport", "Treat shock (oxygen/IV access/fluids per protocol) and rapid transport", "Oral fluids"], correctIndex: 3, explanation: "GI bleeding can cause hypovolemic shock; stabilize perfusion and transport." },
  { id: 619, level: "Paramedic", category: "Medical & OBGYN", text: "A patient has narrow complex tachycardia after stimulant use and is very agitated. Best medication class often used is:", options: ["Aspirin", "Furosemide", "Nitroglycerin", "Benzodiazepines for agitation/sympathetic surge per protocol", "Adenosine always"], correctIndex: 3, explanation: "Sedation can treat agitation and reduce catecholamine surge in stimulant toxicity (per protocol)." },
  { id: 620, level: "Paramedic", category: "Medical & OBGYN", text: "A patient has tricyclic antidepressant overdose with wide QRS. Key antidotal therapy is:", options: ["Magnesium", "Calcium", "Adenosine", "Sodium bicarbonate per protocol", "Nitro"], correctIndex: 3, explanation: "Sodium bicarbonate narrows QRS and treats TCA cardiotoxicity (per protocol)." },
  { id: 621, level: "Paramedic", category: "Medical & OBGYN", text: "A patient has suspected digoxin toxicity (nausea, vision changes, arrhythmias). Best EMS priority is:", options: ["Give calcium routinely", "Give aspirin", "Delay transport", "Monitor ECG closely, support perfusion, consult medical control for specific therapy", "Hyperventilate"], correctIndex: 3, explanation: "Digoxin toxicity causes dangerous dysrhythmias—monitor and treat per protocol/medical direction." },
  { id: 622, level: "Paramedic", category: "Medical & OBGYN", text: "A patient has acute pulmonary embolism suspicion and is hypotensive. Best prehospital focus is:", options: ["Diuretics", "Nitro", "Aspirin", "Oxygen/ventilation support, cautious fluids/pressors per protocol, rapid transport", "Adenosine"], correctIndex: 3, explanation: "PE causes obstructive shock; support oxygenation and perfusion and transport." },
  { id: 623, level: "Paramedic", category: "Medical & OBGYN", text: "A patient has severe allergic reaction but no hypotension yet; they have stridor. Best first-line medication is:", options: ["Diphenhydramine only", "Steroid only", "Albuterol only", "Epinephrine IM per protocol", "Furosemide"], correctIndex: 3, explanation: "Stridor indicates airway involvement—epinephrine is first-line." },
  { id: 624, level: "Paramedic", category: "Medical & OBGYN", text: "A patient with CHF is hypotensive and has crackles. The best initial approach is:", options: ["High-dose nitrates", "Large fluid bolus", "Adenosine", "Support ventilation/oxygenation; avoid aggressive nitrates and treat hypotension per protocol", "Oral glucose"], correctIndex: 3, explanation: "Hypotension changes management; prioritize ventilation and perfusion support per protocol." },
  { id: 625, level: "Paramedic", category: "Medical & OBGYN", text: "A patient has anaphylaxis and is on beta blockers; they respond poorly to epinephrine. Next medication to consider is:", options: ["Aspirin", "Diltiazem", "Furosemide", "Glucagon per protocol", "Nitro"], correctIndex: 3, explanation: "Glucagon can help overcome beta-blockade in refractory anaphylaxis (per protocol)." },
  { id: 626, level: "Paramedic", category: "Medical & OBGYN", text: "A patient has severe hypertension with headache and neuro deficits. Best prehospital priority is:", options: ["Aggressively lower BP to normal", "Ignore neuro deficits", "Give nitro for all cases", "Treat as possible stroke/ICH: airway/oxygen, avoid rapid BP drops, rapid transport", "Give aspirin always"], correctIndex: 3, explanation: "Rapid BP reduction can worsen perfusion; prioritize transport and supportive care." },
  { id: 627, level: "Paramedic", category: "Medical & OBGYN", text: "A patient has SVT and is stable but has a history of Wolff-Parkinson-White (WPW). A key caution is:", options: ["Adenosine never works", "Aspirin is contraindicated", "Oxygen is contraindicated", "Avoid AV nodal blockers in certain WPW rhythms; follow protocol/medical control", "Give nitro"], correctIndex: 3, explanation: "Some WPW-associated tachyarrhythmias worsen with AV nodal blockade; follow protocol." },
  { id: 628, level: "Paramedic", category: "Medical & OBGYN", text: "A patient has suspected opioid withdrawal (yawning, lacrimation, diarrhea) but is breathing well. Best approach is:", options: ["Naloxone", "Defibrillation", "Aspirin", "Supportive care, reassurance, treat symptoms per protocol, transport as needed", "Nitro"], correctIndex: 3, explanation: "Withdrawal is usually not an airway emergency; provide supportive care and monitor." },
  { id: 629, level: "Paramedic", category: "Medical & OBGYN", text: "A patient has severe hypoglycemia but no IV access. Best alternative medication route is:", options: ["Oral aspirin", "Oral nitro", "IM morphine", "Glucagon IM/IN per protocol", "Adenosine"], correctIndex: 3, explanation: "Glucagon can raise blood glucose when IV dextrose is not available." },
  { id: 630, level: "Paramedic", category: "Medical & OBGYN", text: "A patient with renal failure is short of breath, has crackles, and very high BP. Best support is:", options: ["Large fluid bolus", "Aspirin only", "No oxygen", "CPAP and BP management per protocol with rapid transport", "Oral glucose"], correctIndex: 3, explanation: "Fluid overload responds to CPAP and afterload reduction per protocol; definitive dialysis is hospital." },
  { id: 631, level: "Paramedic", category: "Medical & OBGYN", text: "A patient has suspected sepsis and is now cold, mottled, and hypotensive late. This indicates:", options: ["Resolution", "Only anxiety", "Normal perfusion", "Decompensated septic shock", "Hyperventilation syndrome"], correctIndex: 3, explanation: "Late sepsis can shift to cool shock with worsening perfusion and hypotension." },
  { id: 632, level: "Paramedic", category: "Medical & OBGYN", text: "A patient has severe asthma and a ‘shark-fin’ capnography waveform. This indicates:", options: ["Normal ventilation", "Hypoventilation from opioids", "Cardiac tamponade", "Bronchospasm/airflow obstruction", "Hyperkalemia"], correctIndex: 3, explanation: "Shark-fin ETCO2 waveform is classic for bronchospasm." },
  { id: 633, level: "Paramedic", category: "Medical & OBGYN", text: "A patient has suspected stroke and is hypoglycemic at 42. The correct order is:", options: ["Transport without glucose correction", "Give aspirin first", "Give nitro first", "Correct glucose per protocol promptly, then continue stroke pathway/transport", "Delay transport until fully normal"], correctIndex: 3, explanation: "Hypoglycemia mimics stroke and is immediately treatable—correct it rapidly." },
  { id: 634, level: "Paramedic", category: "Medical & OBGYN", text: "A patient has acute psychosis and is a danger to self/others. Best approach is:", options: ["Argue to prove they’re wrong", "Restrain alone without team", "Ignore threats", "Scene safety first, de-escalation, involve law enforcement as needed, sedation/restraint per protocol", "Give aspirin"], correctIndex: 3, explanation: "Safety and controlled de-escalation come first; use protocol for restraint/sedation." },
  { id: 635, level: "Paramedic", category: "Medical & OBGYN", text: "A patient has suspected stroke and takes anticoagulants. This should make you:", options: ["Delay transport", "Give aspirin immediately", "Assume it’s not stroke", "Treat as high-risk for hemorrhage; rapid transport and careful history/med list", "Ignore med list"], correctIndex: 3, explanation: "Anticoagulants increase bleeding risk—rapid evaluation is critical." },
  { id: 636, level: "Paramedic", category: "Medical & OBGYN", text: "A patient has suspected narcotic overdose and receives naloxone, becomes combative. Best next step is:", options: ["Give more naloxone repeatedly", "Fight the patient", "Remove oxygen", "Protect crew safety, consider de-escalation/restraint per protocol, reassess airway/breathing", "Give aspirin"], correctIndex: 3, explanation: "Naloxone can precipitate withdrawal; prioritize safety and reassess ventilation." },
  { id: 637, level: "Paramedic", category: "Medical & OBGYN", text: "A patient has severe vomiting/diarrhea with orthostatic hypotension. Best initial treatment is:", options: ["Diuretics", "Nitro", "Aspirin", "IV fluids per protocol and monitor perfusion", "Adenosine"], correctIndex: 3, explanation: "Volume depletion causes hypovolemia; fluids improve perfusion." },
  { id: 638, level: "Paramedic", category: "Medical & OBGYN", text: "A patient has suspected GI perforation: rigid abdomen, guarding, severe pain. Best EMS action is:", options: ["Give oral fluids", "Delay transport", "Force deep palpation", "Treat shock/pain per protocol and rapid transport", "Give nitro"], correctIndex: 3, explanation: "Rigid abdomen suggests surgical emergency—support and transport." },
  { id: 639, level: "Paramedic", category: "Medical & OBGYN", text: "A patient has “worst headache of life” and photophobia with AMS. Most concerning is:", options: ["Simple migraine", "Sinusitis", "Hypoglycemia", "Subarachnoid hemorrhage", "Asthma"], correctIndex: 3, explanation: "Thunderclap headache is a red flag for SAH—rapid transport is critical." },
  { id: 640, level: "Paramedic", category: "Medical & OBGYN", text: "A patient has unstable SVT and is conscious but very anxious. Best electrical therapy is:", options: ["Defibrillation (unsynchronized) always", "Adenosine first always", "Vagal maneuvers only", "Synchronized cardioversion (sedate if time permits) per protocol", "No treatment"], correctIndex: 3, explanation: "Unstable tachyarrhythmias require synchronized cardioversion; sedation if feasible." },
  { id: 641, level: "Paramedic", category: "Medical & OBGYN", text: "A patient has suspected opioid overdose but also has severe pulmonary edema. Naloxone dosing strategy should be:", options: ["Max-dose immediately always", "Never give naloxone", "Only give naloxone after intubation", "Titrate to adequate ventilation (not full arousal) per protocol", "Oral naloxone"], correctIndex: 3, explanation: "Goal is ventilation; avoid sudden full reversal that can cause agitation/complications." },
  { id: 642, level: "Paramedic", category: "Medical & OBGYN", text: "A patient has suspected sepsis with lactate-type signs and low ETCO2. Low ETCO2 can indicate:", options: ["Hyperoxia", "Overhydration", "Normal perfusion", "Poor perfusion/shock and increased ventilation", "Only asthma"], correctIndex: 3, explanation: "Low ETCO2 often correlates with poor perfusion and shock severity." },
  { id: 643, level: "Paramedic", category: "Medical & OBGYN", text: "A patient with acute coronary syndrome takes nitroglycerin and becomes profoundly hypotensive. A key contraindication to nitro is:", options: ["Age over 40", "Mild nausea", "Headache", "Recent PDE-5 inhibitor use (e.g., sildenafil) or RV infarct suspicion", "Normal BP"], correctIndex: 3, explanation: "PDE-5 inhibitors and RV infarct/preload dependence can cause severe hypotension with nitro." },
  { id: 644, level: "Paramedic", category: "Medical & OBGYN", text: "A patient has acute severe dyspnea and pink frothy sputum. Most consistent diagnosis is:", options: ["DKA", "Opioid overdose", "Pneumothorax", "Acute pulmonary edema", "Appendicitis"], correctIndex: 3, explanation: "Pink frothy sputum and crackles are classic for pulmonary edema." },
  { id: 645, level: "Paramedic", category: "Medical & OBGYN", text: "A newborn is delivered and is blue with good tone, HR 140, and breathing. Best action is:", options: ["Chest compressions", "Epinephrine", "Intubate", "Warm/dry, clear airway if needed, and monitor (routine care)", "Naloxone"], correctIndex: 3, explanation: "If breathing and HR are adequate, provide routine newborn care and monitoring." },

  // 6) EMS Operations (Paramedic) — 646–685
  { id: 646, level: "Paramedic", category: "EMS Operations", text: "In ICS, the person responsible for overall incident management is:", options: ["Safety Officer", "Public Information Officer", "Operations Section Chief", "Incident Commander", "Medical Director"], correctIndex: 3, explanation: "The Incident Commander has overall responsibility for incident objectives and management." },
  { id: 647, level: "Paramedic", category: "EMS Operations", text: "The Safety Officer reports directly to:", options: ["Operations", "Planning", "Logistics", "Incident Commander", "Finance"], correctIndex: 3, explanation: "The Safety Officer is Command Staff and reports to the Incident Commander." },
  { id: 648, level: "Paramedic", category: "EMS Operations", text: "A START triage patient who is not breathing initially but begins breathing after airway repositioning is tagged:", options: ["Black", "Green", "Yellow", "Red", "Blue"], correctIndex: 3, explanation: "In START, breathing resumes after airway repositioning = immediate (Red)." },
  { id: 649, level: "Paramedic", category: "EMS Operations", text: "The most defensible documentation style is:", options: ["Opinions and guesses", "Slang and abbreviations", "Copy-paste without reassessment", "Objective findings with times, treatments, and patient response", "Only final diagnosis"], correctIndex: 3, explanation: "Objective, time-stamped documentation supports care continuity and legal defense." },
  { id: 650, level: "Paramedic", category: "EMS Operations", text: "The highest-risk medication safety error is commonly prevented by:", options: ["Skipping the label to save time", "Using memory for dosing", "Drawing meds in a moving ambulance without checks", "Right patient/right drug/right dose/right route/right time verification", "Never using protocols"], correctIndex: 3, explanation: "The medication ‘rights’ reduce administration errors and patient harm." },
  { id: 651, level: "Paramedic", category: "EMS Operations", text: "A refusal is only valid when the patient has:", options: ["A family member present", "A signature only", "A calm tone", "Decision-making capacity and informed understanding of risks/benefits", "No pain"], correctIndex: 3, explanation: "Capacity and informed refusal are required; document risks explained and understanding." },
  { id: 652, level: "Paramedic", category: "EMS Operations", text: "If an error is found after PCR submission, the best action is:", options: ["Delete the PCR", "Change values silently", "Ask partner to rewrite", "Follow policy with an addendum/correction preserving original record", "Ignore it"], correctIndex: 3, explanation: "Corrections must maintain integrity via approved addendum/correction process." },
  { id: 653, level: "Paramedic", category: "EMS Operations", text: "Medical direction includes:", options: ["Only online orders", "Only offline protocols", "Only physician ride-alongs", "Online and offline medical oversight (protocols, QA, training)", "Only nursing supervision"], correctIndex: 3, explanation: "EMS practice is guided by both direct (online) and indirect (offline) medical direction." },
  { id: 654, level: "Paramedic", category: "EMS Operations", text: "The most important element of handoff is:", options: ["Leaving quickly to clear the unit", "Only giving the written PCR", "Talking only to family", "Clear verbal report to receiving clinician with acceptance of care", "Avoiding vital signs"], correctIndex: 3, explanation: "A complete handoff prevents errors and avoids abandonment." },
  { id: 655, level: "Paramedic", category: "EMS Operations", text: "When using radio communication, protected health information should be:", options: ["Broadcast with full name and SSN", "Shared to educate the public", "Posted online later", "Limited to what’s necessary for care/operations per policy", "Shared with bystanders"], correctIndex: 3, explanation: "Only necessary information should be shared to protect privacy." },
  { id: 656, level: "Paramedic", category: "EMS Operations", text: "A paramedic provides care outside protocol without medical control and harms a patient. This is most consistent with:", options: ["Good Samaritan immunity always", "Quality improvement only", "Informed consent", "Negligence/deviation from standard of care", "HIPAA compliance"], correctIndex: 3, explanation: "Departing from standard/protocol without justification can be negligence." },
  { id: 657, level: "Paramedic", category: "EMS Operations", text: "In an MCI, the primary objective of triage is to:", options: ["Treat the sickest first always", "Spend equal time on all patients", "Avoid transporting anyone", "Do the greatest good for the greatest number with limited resources", "Complete paperwork first"], correctIndex: 3, explanation: "Triage allocates scarce resources to maximize survival." },
  { id: 658, level: "Paramedic", category: "EMS Operations", text: "A medication vial label is unreadable. The safest action is:", options: ["Use it anyway", "Guess based on color", "Ask partner to smell it", "Do not administer; obtain correctly labeled medication", "Double the dose"], correctIndex: 3, explanation: "Never administer an unidentified medication." },
  { id: 659, level: "Paramedic", category: "EMS Operations", text: "A patient is violent and the scene is unsafe. Best action is:", options: ["Enter alone to calm them", "Challenge them verbally", "Ignore weapons", "Stage and wait for law enforcement to secure the scene", "Park closer to be faster"], correctIndex: 3, explanation: "Provider safety comes first—do not enter unsafe scenes." },
  { id: 660, level: "Paramedic", category: "EMS Operations", text: "The best evidence preservation step at a crime scene while still treating is:", options: ["Collect evidence in your pockets", "Move weapons to a table", "Search the house", "Limit disturbance, document observations, and hand off to law enforcement", "Take photos for social media"], correctIndex: 3, explanation: "Treat the patient but minimize scene disruption and document objectively." },
  { id: 661, level: "Paramedic", category: "EMS Operations", text: "A paramedic must report suspected child abuse because:", options: ["It is optional", "Only if the family agrees", "Only after hospital confirms", "They are a mandated reporter (jurisdiction dependent) and must follow policy/law", "It is never allowed"], correctIndex: 3, explanation: "Suspected abuse is typically a mandated report—document objectively and report per law." },
  { id: 662, level: "Paramedic", category: "EMS Operations", text: "If a patient lacks capacity and is refusing lifesaving care, EMS should:", options: ["Honor refusal without question", "Leave immediately", "Argue until they agree", "Use implied consent/surrogate pathways and involve medical control/law enforcement per policy", "Only accept written refusal"], correctIndex: 3, explanation: "Refusal requires capacity; without it, care may proceed under implied consent/policy." },
  { id: 663, level: "Paramedic", category: "EMS Operations", text: "The most important PPE for potential aerosol respiratory illness is:", options: ["No PPE needed", "Leather gloves", "Safety boots only", "Appropriate respiratory protection per policy (e.g., N95) plus eye protection", "Sunglasses"], correctIndex: 3, explanation: "Respiratory PPE and eye protection reduce exposure risk in aerosol-generating environments." },
  { id: 664, level: "Paramedic", category: "EMS Operations", text: "A unit is involved in an ambulance crash en route to a call. The correct priority is:", options: ["Continue to the call no matter what", "Ignore injuries", "Hide the crash", "Scene safety, request help, assess injuries, notify dispatch per policy", "Finish the PCR first"], correctIndex: 3, explanation: "Handle the crash as an emergency: safety, patient/crew assessment, and notification." },
  { id: 665, level: "Paramedic", category: "EMS Operations", text: "When transferring controlled substances, best practice is:", options: ["No documentation needed", "Let anyone handle them", "Share vials to save time", "Maintain chain-of-custody documentation per policy", "Keep extras for later"], correctIndex: 3, explanation: "Controlled substances require strict accountability and documentation." },
  { id: 666, level: "Paramedic", category: "EMS Operations", text: "The MOST important element of a STEMI pre-notification is:", options: ["Patient’s favorite hospital", "Insurance provider", "Full social history", "12-lead evidence + symptom onset time + ETA to activate cath lab", "Food allergies only"], correctIndex: 3, explanation: "Early cath lab activation depends on ECG findings, onset timing, and ETA." },
  { id: 667, level: "Paramedic", category: "EMS Operations", text: "If a patient requests no information be shared with family, EMS should:", options: ["Tell family everything", "Refuse to treat", "Call media", "Limit disclosure to what patient permits unless legally required", "Give family the PCR"], correctIndex: 3, explanation: "Respect privacy; disclose only permitted/necessary information." },
  { id: 668, level: "Paramedic", category: "EMS Operations", text: "A paramedic’s scope of practice is defined primarily by:", options: ["What they feel comfortable doing", "What a patient demands", "What a coworker allows", "State/local regulations and medical director protocols", "Internet guidelines"], correctIndex: 3, explanation: "Scope is set by law/regulation and medical direction/protocols." },
  { id: 669, level: "Paramedic", category: "EMS Operations", text: "The safest approach to medication dosing is:", options: ["Estimate based on age", "Use the last patient’s dose", "Rely on memory only", "Use protocol references, weight-based dosing when applicable, and double-check calculations", "Skip calculations under stress"], correctIndex: 3, explanation: "Use references and double-check dosing to prevent harmful errors." },
  { id: 670, level: "Paramedic", category: "EMS Operations", text: "If you administer a medication and the patient has an adverse reaction, your documentation should include:", options: ["Only that you gave the med", "No times", "No reassessment", "Dose/route/time, patient response, interventions, and notifications", "Only your opinion"], correctIndex: 3, explanation: "Complete documentation must capture what happened and how it was managed." },
  { id: 671, level: "Paramedic", category: "EMS Operations", text: "A patient’s valuables transported with them should be:", options: ["Left on scene", "Given to random bystander", "Taken for safekeeping without record", "Secured and documented per policy and handed off appropriately", "Thrown away"], correctIndex: 3, explanation: "Document and secure belongings to prevent loss/claims." },
  { id: 672, level: "Paramedic", category: "EMS Operations", text: "In START triage, a patient who can walk is tagged:", options: ["Red", "Yellow", "Black", "Green", "Blue"], correctIndex: 3, explanation: "Walking wounded are Green (minor) in START." },
  { id: 673, level: "Paramedic", category: "EMS Operations", text: "A patient is apneic and pulseless. Consent for resuscitation is:", options: ["Always required in writing first", "Never allowed without family", "Only if patient is insured", "Implied unless valid DNR/advanced directive applies", "Refused automatically"], correctIndex: 3, explanation: "Resuscitation proceeds under implied consent unless a valid directive limits it." },
  { id: 674, level: "Paramedic", category: "EMS Operations", text: "If a valid DNR is present, EMS should:", options: ["Provide no care at all", "Refuse transport", "Ignore the form", "Withhold CPR/defib but provide comfort/supportive care per policy", "Give aspirin only"], correctIndex: 3, explanation: "DNR limits resuscitation—not comfort care or other appropriate treatments per policy." },
  { id: 675, level: "Paramedic", category: "EMS Operations", text: "When operating emergency vehicle with lights/sirens, you must:", options: ["Assume intersections will clear", "Exceed any speed safely", "Ignore red lights", "Drive with due regard and follow law/policy; you are still responsible for safety", "Use siren only on highways"], correctIndex: 3, explanation: "Due regard is mandatory; lights/sirens do not remove responsibility." },
  { id: 676, level: "Paramedic", category: "EMS Operations", text: "A patient refuses care and leaves. The most important risk-reduction step is:", options: ["Don’t document to avoid trouble", "Write “refused” only", "Argue with patient", "Document capacity assessment, risks explained, patient statements, and signatures/witness per policy", "Take their ID"], correctIndex: 3, explanation: "Refusal documentation must prove capacity and informed refusal." },
  { id: 677, level: "Paramedic", category: "EMS Operations", text: "If you suspect elder neglect, the best action is:", options: ["Ignore it", "Post online", "Confront caregivers angrily", "Follow reporting law/policy and document objective findings/quotes", "Tell neighbors"], correctIndex: 3, explanation: "Report appropriately and document objectively without escalation." },
  { id: 678, level: "Paramedic", category: "EMS Operations", text: "A paramedic who leaves a patient after starting care without transfer or refusal commits:", options: ["HIPAA", "Assault", "Battery", "Abandonment", "Defamation"], correctIndex: 3, explanation: "Ending care without proper handoff/refusal is abandonment." },
  { id: 679, level: "Paramedic", category: "EMS Operations", text: "The best time to request additional units at an MCI is:", options: ["After first transport", "After documentation is complete", "After you triage every patient fully", "During initial scene size-up/early recognition", "Never; dispatch will guess"], correctIndex: 3, explanation: "Early resource requests prevent delays and improve outcomes." },
  { id: 680, level: "Paramedic", category: "EMS Operations", text: "If medication is drawn up, the safest labeling practice is:", options: ["No label needed if you remember", "Label after you give it", "Let partner guess", "Label immediately with drug and concentration/dose", "Shake to identify"], correctIndex: 3, explanation: "Immediate labeling prevents wrong-drug errors." },
  { id: 681, level: "Paramedic", category: "EMS Operations", text: "In a multi-agency incident, the Liaison Officer primarily:", options: ["Treats patients", "Runs triage", "Drives ambulances", "Coordinates with assisting agencies", "Handles payroll"], correctIndex: 3, explanation: "The Liaison Officer is the point of contact for assisting agencies." },
  { id: 682, level: "Paramedic", category: "EMS Operations", text: "A good radio report to the ED should include:", options: ["Only the diagnosis", "Only the patient name", "A long story without vitals", "Age/sex, chief complaint, key findings, vitals, treatments, response, ETA", "No ETA"], correctIndex: 3, explanation: "Structured reports improve readiness and continuity of care." },
  { id: 683, level: "Paramedic", category: "EMS Operations", text: "If a provider is exposed to blood, the FIRST action is:", options: ["Finish the call first", "Ignore it if gloved", "Self-prescribe antibiotics", "Wash/flush immediately and report per policy", "Post online"], correctIndex: 3, explanation: "Immediate decontamination and reporting are required for exposure management." },
  { id: 684, level: "Paramedic", category: "EMS Operations", text: "Quality improvement (QI) in EMS primarily aims to:", options: ["Punish providers", "Hide errors", "Reduce training", "Improve patient care via review, feedback, and system fixes", "Eliminate documentation"], correctIndex: 3, explanation: "QI focuses on improving care and systems, not punishment." },
  { id: 685, level: "Paramedic", category: "EMS Operations", text: "The most reliable way to reduce infection transmission between patients is:", options: ["Air freshener", "Antibiotics for providers", "Wearing the same gloves all day", "Hand hygiene and proper cleaning/disinfection of equipment", "Skipping cleaning to be faster"], correctIndex: 3, explanation: "Hand hygiene and decontamination are the core infection-control measures." },

  // 7) Airway (Paramedic) — 686–725
  { id: 686, level: "Paramedic", category: "Airway", text: "Waveform capnography showing a ‘shark-fin’ pattern is most consistent with:", options: ["Esophageal intubation", "Hyperventilation", "Cardiac tamponade", "Bronchospasm/airflow obstruction", "Normal ventilation"], correctIndex: 3, explanation: "A slanted upstroke (‘shark fin’) indicates obstructed exhalation from bronchospasm." },
  { id: 687, level: "Paramedic", category: "Airway", text: "The best confirmation of an advanced airway in the field is:", options: ["Fogging", "Chest rise only", "Pulse oximetry", "Continuous waveform capnography", "Breath sounds at one apex only"], correctIndex: 3, explanation: "Continuous waveform capnography is the most reliable placement/ventilation confirmation." },
  { id: 688, level: "Paramedic", category: "Airway", text: "An intubated patient’s ETCO2 suddenly becomes zero. The FIRST action is:", options: ["Give bicarbonate", "Increase oxygen flow", "Ignore it if SpO2 is okay", "Check disconnection/dislodgement and assess perfusion immediately", "Give aspirin"], correctIndex: 3, explanation: "Zero ETCO2 suggests disconnection, extubation, or no perfusion—reassess immediately." },
  { id: 689, level: "Paramedic", category: "Airway", text: "In cardiac arrest with an advanced airway, ventilation rate should be:", options: ["30/min", "20/min", "15/min", "10/min (1 breath every 6 seconds)", "2/min"], correctIndex: 3, explanation: "Over-ventilation worsens venous return; ventilate ~10/min without pausing compressions." },
  { id: 690, level: "Paramedic", category: "Airway", text: "A common cause of difficult BVM ventilation is:", options: ["Too much oxygen", "Normal anatomy", "Low ETCO2", "Poor mask seal and airway obstruction; fix with positioning/adjuncts/two-person technique", "Too many breaths"], correctIndex: 3, explanation: "Optimize positioning, use OPA/NPA when appropriate, and use two-person BVM for a better seal." },
  { id: 691, level: "Paramedic", category: "Airway", text: "A patient with suspected head injury is being ventilated. Best ETCO2 target is generally:", options: ["10–15", "20–25", "50–60", "Normal range (avoid hyperventilation) unless herniation signs per protocol", "0"], correctIndex: 3, explanation: "Maintain normocapnia; hyperventilation is reserved for impending herniation per protocol." },
  { id: 692, level: "Paramedic", category: "Airway", text: "CPAP is generally contraindicated in:", options: ["CHF with HTN", "Asthma with wheeze", "COPD with alert patient", "Apnea or inability to protect airway/altered mental status", "Mild dyspnea with good mentation"], correctIndex: 3, explanation: "CPAP requires a cooperative patient who can maintain airway and breathe spontaneously." },
  { id: 693, level: "Paramedic", category: "Airway", text: "A patient with tracheostomy in distress should receive oxygen:", options: ["Only by nasal cannula", "Only by NRB on face", "Only by mouth-to-mouth", "Directly over the stoma with appropriate device; ventilate via stoma if needed", "Not possible"], correctIndex: 3, explanation: "Tracheostomy patients ventilate through the stoma—apply oxygen/PPV there." },
  { id: 694, level: "Paramedic", category: "Airway", text: "During RSI, the purpose of preoxygenation is:", options: ["To sedate the patient", "To paralyze the patient", "To lower blood pressure", "To maximize oxygen reserves during apnea", "To raise CO2"], correctIndex: 3, explanation: "Preoxygenation delays desaturation during laryngoscopy/apnea." },
  { id: 695, level: "Paramedic", category: "Airway", text: "If you cannot ventilate after placing a supraglottic airway, the best next step is:", options: ["Leave it and transport", "Turn off oxygen", "Give aspirin", "Reposition, reassess seal/size, suction, and consider alternate airway per protocol", "Give oral glucose"], correctIndex: 3, explanation: "Troubleshoot: position, suction, seal, size; escalate to backup plan if still failing." },
  { id: 696, level: "Paramedic", category: "Airway", text: "A right mainstem intubation typically presents as:", options: ["Absent right sounds", "Equal sounds", "Wheezing only", "Absent/diminished left breath sounds with unequal chest rise", "Normal ETCO2 always"], correctIndex: 3, explanation: "ET tube too deep enters right mainstem; withdraw slightly and recheck bilaterally." },
  { id: 697, level: "Paramedic", category: "Airway", text: "Gastric distention during BVM most often results from:", options: ["Low oxygen flow", "Using an OPA", "Slow breaths", "Excessive ventilation pressure/volume and poor airway positioning", "Capnography use"], correctIndex: 3, explanation: "Avoid over-ventilation and ensure proper airway alignment and seal." },
  { id: 698, level: "Paramedic", category: "Airway", text: "A sudden rise in ETCO2 during CPR is most consistent with:", options: ["Worsening compressions", "Tube dislodgement", "Hyperglycemia", "Improved perfusion/possible ROSC", "Severe hypothermia"], correctIndex: 3, explanation: "ETCO2 rises when circulation improves; a sudden jump can signal ROSC." },
  { id: 699, level: "Paramedic", category: "Airway", text: "In suspected opioid overdose, the best endpoint for naloxone dosing is:", options: ["Patient is fully awake and angry", "No change in mental status", "Pinpoint pupils become large", "Adequate spontaneous ventilation", "Pain score 0"], correctIndex: 3, explanation: "Titrate naloxone to restore breathing, not full arousal." },
  { id: 700, level: "Paramedic", category: "Airway", text: "If a patient has copious secretions and airway obstruction, the first airway tool is:", options: ["CPAP", "Intubation immediately without prep", "Nebulizer", "Suction", "Aspirin"], correctIndex: 3, explanation: "Clear the airway first—suction is the immediate priority." },
  { id: 701, level: "Paramedic", category: "Airway", text: "The best way to improve laryngoscopy view in many patients is:", options: ["Flat supine only", "Head down", "No positioning", "Optimize positioning (sniffing/ramped) and external laryngeal manipulation as needed", "Avoid suction"], correctIndex: 3, explanation: "Positioning and external manipulation often improve the glottic view." },
  { id: 702, level: "Paramedic", category: "Airway", text: "Apneic oxygenation during RSI is intended to:", options: ["Increase CO2 elimination", "Paralyze the diaphragm", "Lower ETCO2 rapidly", "Delay desaturation by providing oxygen during apnea", "Treat bronchospasm"], correctIndex: 3, explanation: "Oxygen can still diffuse into blood during apnea, prolonging safe apnea time." },
  { id: 703, level: "Paramedic", category: "Airway", text: "In pediatric patients, deterioration most commonly occurs from:", options: ["Sudden VF", "Stroke", "GI bleed", "Respiratory failure/hypoxia", "Renal colic"], correctIndex: 3, explanation: "Children usually arrest from respiratory failure—prioritize oxygenation/ventilation early." },
  { id: 704, level: "Paramedic", category: "Airway", text: "A capnography tracing that is present but very low (e.g., ETCO2 8) in shock most suggests:", options: ["Normal perfusion", "Excellent CPR", "Hyperkalemia", "Low perfusion/low cardiac output", "Over-oxygenation"], correctIndex: 3, explanation: "Low ETCO2 often correlates with poor perfusion and low CO2 delivery to lungs." },
  { id: 705, level: "Paramedic", category: "Airway", text: "A patient aspirates and becomes hypoxic with coarse crackles. Best immediate action is:", options: ["Give aspirin", "Give nitro", "Stop ventilations", "Suction and support oxygenation/ventilation", "Give oral glucose"], correctIndex: 3, explanation: "Clear the airway and maintain ventilation/oxygenation." },
  { id: 706, level: "Paramedic", category: "Airway", text: "A ‘can’t intubate, can’t oxygenate’ scenario requires:", options: ["More attempts with same approach", "Wait for hospital", "Oral glucose", "Emergency surgical airway per protocol", "Aspirin"], correctIndex: 3, explanation: "When oxygenation fails, proceed to emergency airway per protocol." },
  { id: 707, level: "Paramedic", category: "Airway", text: "The primary danger of hyperventilation in shock/trauma is:", options: ["Increased venous return", "Higher perfusion", "Lower intrathoracic pressure", "Decreased venous return and worsened perfusion from increased intrathoracic pressure", "Reduced airway resistance"], correctIndex: 3, explanation: "Excess ventilation increases intrathoracic pressure and reduces preload/perfusion." },
  { id: 708, level: "Paramedic", category: "Airway", text: "A patient has severe bronchospasm with very high airway pressures. Best ventilatory adjustment is:", options: ["Increase rate to 30", "Increase tidal volume a lot", "Stop ventilation", "Reduce rate and allow long exhalation while treating bronchospasm", "Give aspirin"], correctIndex: 3, explanation: "Allow more exhalation to prevent air trapping and hypotension." },
  { id: 709, level: "Paramedic", category: "Airway", text: "In ventilating an adult with a pulse but apnea, the target rate is closest to:", options: ["30/min", "20/min", "15/min", "10/min (1 breath every ~6 seconds)", "2/min"], correctIndex: 3, explanation: "For respiratory arrest with pulse, ventilate about 10 breaths/min." },
  { id: 710, level: "Paramedic", category: "Airway", text: "If SpO2 is 100% but ETCO2 is rising with somnolence, the main problem is:", options: ["Oxygenation", "Anaphylaxis", "Bleeding", "Ventilation failure (CO2 retention)", "Hypoglycemia"], correctIndex: 3, explanation: "A patient can be well-oxygenated but hypoventilating and retaining CO2." },
  { id: 711, level: "Paramedic", category: "Airway", text: "A patient with CHF in severe distress is awake and cooperative. Best noninvasive airway support is:", options: ["BVM immediately", "No oxygen", "Oral airway", "CPAP per protocol", "Jaw-thrust only"], correctIndex: 3, explanation: "CPAP reduces work of breathing and improves oxygenation in pulmonary edema." },
  { id: 712, level: "Paramedic", category: "Airway", text: "A patient with suspected basilar skull fracture needs an airway adjunct and has gag reflex. Best option is:", options: ["NPA", "Force OPA in", "No airway management", "Avoid NPA; use positioning/suction and support ventilations as needed", "Oral glucose"], correctIndex: 3, explanation: "Avoid nasal adjuncts; manage with positioning/suction and ventilation support." },
  { id: 713, level: "Paramedic", category: "Airway", text: "A patient is being ventilated and you hear gurgling in epigastrium. Best correction is:", options: ["Increase bag pressure", "Ventilate faster", "Stop oxygen", "Reposition airway, use adjunct, reduce volume/pressure, ensure seal", "Give aspirin"], correctIndex: 3, explanation: "Gastric insufflation indicates poor technique/positioning—correct airway alignment and ventilations." },
  { id: 714, level: "Paramedic", category: "Airway", text: "Post-intubation, the most important immediate step is:", options: ["Remove the stylet later", "Stop monitoring", "Ventilate at 30/min", "Secure the tube and continuously monitor with waveform capnography", "Give adenosine"], correctIndex: 3, explanation: "Tube dislodgement is common—secure and continuously confirm ventilation." },
  { id: 715, level: "Paramedic", category: "Airway", text: "A patient with suspected epiglottitis is drooling and tripod, very anxious. Best approach is:", options: ["Force them supine", "Do repeated tongue depressor exams", "Aggressively suction deep", "Keep calm, allow position of comfort, give gentle oxygen, prepare advanced airway, rapid transport", "Give oral glucose"], correctIndex: 3, explanation: "Avoid agitation; airway can close suddenly—support and prepare for airway management." },
  { id: 716, level: "Paramedic", category: "Airway", text: "If capnography shows persistent waveform but very low ETCO2 during arrest, the best compression improvement is:", options: ["Compress slower", "Pause more often", "Ventilate faster", "Increase compression quality (depth/rate, full recoil, minimize pauses)", "Stop compressions"], correctIndex: 3, explanation: "Low ETCO2 suggests poor perfusion—optimize compressions." },
  { id: 717, level: "Paramedic", category: "Airway", text: "A patient has stridor and severe respiratory distress after allergic exposure. Best first medication is:", options: ["Albuterol only", "Diphenhydramine only", "Steroids only", "Epinephrine per protocol", "Furosemide"], correctIndex: 3, explanation: "Upper-airway swelling/stridor from anaphylaxis needs epinephrine first." },
  { id: 718, level: "Paramedic", category: "Airway", text: "A patient has apnea after sedation. The safest immediate action is:", options: ["Wait for medication to wear off", "Give aspirin", "Give nitro", "Open airway and provide BVM ventilations with oxygen", "Let them sleep"], correctIndex: 3, explanation: "Treat apnea immediately with airway positioning and assisted ventilation." },
  { id: 719, level: "Paramedic", category: "Airway", text: "A patient has COPD and is being ventilated. Best practice to avoid air trapping is:", options: ["Very fast rate", "No PEEP ever", "Large tidal volumes", "Lower rate with longer expiratory time", "Stop oxygen"], correctIndex: 3, explanation: "Allow full exhalation to prevent dynamic hyperinflation." },
  { id: 720, level: "Paramedic", category: "Airway", text: "A patient has cyanosis and minimal chest rise with BVM. Most likely problem is:", options: ["Too much oxygen", "Too much suction", "Too much ETCO2", "Poor seal/obstruction; fix with two-person BVM, adjuncts, repositioning", "Normal ventilation"], correctIndex: 3, explanation: "Correct the basics: seal, airway position, adjuncts, suction, and technique." },
  { id: 721, level: "Paramedic", category: "Airway", text: "An intubated patient’s ETCO2 gradually rises from 40 to 65 with somnolence. The best interpretation is:", options: ["Tube is in esophagus", "Patient is improving", "Hyperventilation", "Hypoventilation/CO2 retention; adjust ventilation and reassess", "Hypoglycemia"], correctIndex: 3, explanation: "Rising ETCO2 suggests inadequate ventilation or worsening airway disease—adjust ventilation." },
  { id: 722, level: "Paramedic", category: "Airway", text: "A patient has severe asthma and is tiring. A late dangerous sign is:", options: ["Wheezing loudly", "Speaking in full sentences", "Normal mentation", "Silent chest with decreasing mental status", "Tachycardia"], correctIndex: 3, explanation: "Silent chest indicates minimal airflow—impending respiratory failure." },
  { id: 723, level: "Paramedic", category: "Airway", text: "If an OPA triggers gagging, the correct action is:", options: ["Force it in deeper", "Tape it in place", "Give oral glucose", "Remove it and use an NPA (if not contraindicated) or alternative airway support", "Ignore gagging"], correctIndex: 3, explanation: "OPA is for patients without gag reflex; gagging indicates it’s not tolerated." },
  { id: 724, level: "Paramedic", category: "Airway", text: "A patient has an upper airway foreign body with complete obstruction and becomes unresponsive. Next step is:", options: ["Back blows only", "Blind finger sweep", "Give water", "Start CPR and check mouth for object between compressions per protocol", "Wait for ALS"], correctIndex: 3, explanation: "Unresponsive choking = CPR; remove visible object only (no blind sweep)." },
  { id: 725, level: "Paramedic", category: "Airway", text: "The best reason to avoid excessive BVM ventilation in cardiac arrest is:", options: ["It improves venous return", "It improves coronary perfusion", "It increases perfusion", "It decreases venous return and coronary perfusion by raising intrathoracic pressure", "It prevents aspiration"], correctIndex: 3, explanation: "Hyperventilation is harmful in arrest—ventilate slowly and focus on compressions." },

  // 8) Clinical Judgment (Paramedic) — 726–755
  { id: 726, level: "Paramedic", category: "Clinical Judgment", text: "A patient is hypotensive with clear lungs, cool clammy skin, and tachycardia after vomiting/diarrhea. Most likely shock type is:", options: ["Cardiogenic", "Obstructive", "Neurogenic", "Hypovolemic", "Septic"], correctIndex: 3, explanation: "Fluid loss causes hypovolemia with tachycardia and cool clammy skin." },
  { id: 727, level: "Paramedic", category: "Clinical Judgment", text: "A patient has hypotension with JVD and clear lungs after chest trauma. Best diagnosis to consider is:", options: ["DKA", "Sepsis", "Asthma", "Cardiac tamponade", "Heat exhaustion"], correctIndex: 3, explanation: "JVD + shock with clear lungs after trauma suggests obstructive cause like tamponade." },
  { id: 728, level: "Paramedic", category: "Clinical Judgment", text: "A patient has fever, hypotension, and warm flushed skin early. This pattern is most consistent with:", options: ["Hypovolemic shock", "Cardiogenic shock", "Obstructive shock", "Distributive (septic) shock", "Neurogenic shock"], correctIndex: 3, explanation: "Early sepsis can present with warm shock due to vasodilation." },
  { id: 729, level: "Paramedic", category: "Clinical Judgment", text: "A patient has sudden dyspnea and pleuritic chest pain with unilateral leg swelling. Most concerning diagnosis is:", options: ["CHF", "Pneumonia", "Asthma", "Pulmonary embolism", "GERD"], correctIndex: 3, explanation: "DVT signs + pleuritic pain + sudden dyspnea strongly suggest PE." },
  { id: 730, level: "Paramedic", category: "Clinical Judgment", text: "A patient has crushing chest pain with diaphoresis but normal ECG. The best interpretation is:", options: ["No cardiac issue possible", "It is always anxiety", "It is always GERD", "ACS is still possible; treat clinically and repeat ECG/transport", "Give no aspirin ever"], correctIndex: 3, explanation: "Early ACS can have nondiagnostic ECG—treat based on presentation and reassess." },
  { id: 731, level: "Paramedic", category: "Clinical Judgment", text: "A patient has AMS and pinpoint pupils but RR 18 and good tidal volume. Best action is:", options: ["Naloxone immediately for all", "Ignore pupils", "Give aspirin", "Supportive monitoring and evaluate causes; naloxone is for respiratory depression per protocol", "Hyperventilate"], correctIndex: 3, explanation: "Naloxone is indicated primarily for hypoventilation/respiratory depression." },
  { id: 732, level: "Paramedic", category: "Clinical Judgment", text: "A patient has severe abdominal pain with hypotension and rigid abdomen. The highest priority is:", options: ["Give oral fluids", "Delay transport", "Long on-scene exam", "Treat shock and rapid transport for surgical emergency", "Give nitro"], correctIndex: 3, explanation: "Rigid abdomen with shock suggests life-threatening intra-abdominal catastrophe." },
  { id: 733, level: "Paramedic", category: "Clinical Judgment", text: "A patient is pale, diaphoretic, tachycardic, and has low ETCO2. This most likely indicates:", options: ["Improved perfusion", "Normal physiology", "Hyperventilation only", "Shock/poor perfusion", "Hyperglycemia"], correctIndex: 3, explanation: "Low ETCO2 with shock signs suggests low perfusion/cardiac output." },
  { id: 734, level: "Paramedic", category: "Clinical Judgment", text: "A patient has wheezing but also has JVD and leg edema. Best interpretation is:", options: ["Asthma only", "Allergic reaction only", "Pneumonia only", "CHF can mimic wheeze (“cardiac asthma”); assess for fluid overload", "Stroke"], correctIndex: 3, explanation: "Wheezing can occur in CHF; look for JVD/edema/crackles and history." },
  { id: 735, level: "Paramedic", category: "Clinical Judgment", text: "A patient is hypoxic with normal lungs on auscultation and sudden dyspnea. Best cause to consider is:", options: ["GI bleed", "Renal colic", "Otitis", "Pulmonary embolism", "Migraine"], correctIndex: 3, explanation: "PE can cause severe dyspnea/hypoxia with relatively clear lung sounds." },
  { id: 736, level: "Paramedic", category: "Clinical Judgment", text: "A patient has severe headache, HTN, bradycardia, and irregular respirations. This suggests:", options: ["Sepsis", "Opioid overdose", "COPD", "Increased ICP (Cushing response)", "Hypoglycemia"], correctIndex: 3, explanation: "Cushing response is a late sign of increased intracranial pressure." },
  { id: 737, level: "Paramedic", category: "Clinical Judgment", text: "A patient has Kussmaul respirations and very high glucose. The body is trying to:", options: ["Retain CO2", "Lower oxygen", "Increase potassium", "Blow off CO2 to compensate for metabolic acidosis", "Cause apnea"], correctIndex: 3, explanation: "DKA causes metabolic acidosis; deep rapid breathing compensates by lowering CO2." },
  { id: 738, level: "Paramedic", category: "Clinical Judgment", text: "A patient has narrow-complex tachycardia due to fever. Best treatment is:", options: ["Adenosine", "Synchronized cardioversion", "Defibrillation", "Treat the cause (cooling/fluids) and monitor", "Atropine"], correctIndex: 3, explanation: "Sinus tachycardia is compensatory; treat underlying cause." },
  { id: 739, level: "Paramedic", category: "Clinical Judgment", text: "A patient has hypotension with crackles and JVD. Most likely shock type is:", options: ["Hypovolemic", "Neurogenic", "Anaphylactic", "Cardiogenic", "Heat exhaustion"], correctIndex: 3, explanation: "Crackles + JVD with hypotension suggests pump failure (cardiogenic shock)." },
  { id: 740, level: "Paramedic", category: "Clinical Judgment", text: "A patient with suspected sepsis remains hypotensive after adequate fluids. Next step is typically:", options: ["Stop treatment", "Give diuretics", "Give nitro", "Vasopressor support per protocol", "Adenosine"], correctIndex: 3, explanation: "Fluid-refractory distributive shock often requires vasopressors." },
  { id: 741, level: "Paramedic", category: "Clinical Judgment", text: "A patient is confused with unilateral weakness; glucose is 42. Most likely cause is:", options: ["Stroke always", "Aortic dissection", "Sepsis", "Hypoglycemia mimicking stroke", "Pulmonary edema"], correctIndex: 3, explanation: "Low glucose can mimic focal neuro deficits—treat glucose first per protocol." },
  { id: 742, level: "Paramedic", category: "Clinical Judgment", text: "A patient has severe dyspnea, wheeze, and hives after a medication. Most time-critical diagnosis is:", options: ["Pneumonia", "CHF", "PE", "Anaphylaxis", "DKA"], correctIndex: 3, explanation: "Anaphylaxis can rapidly obstruct airway and cause shock—treat immediately." },
  { id: 743, level: "Paramedic", category: "Clinical Judgment", text: "A patient has sudden tearing chest pain to the back and neuro deficits. Best concern is:", options: ["Stable angina", "GERD", "Asthma", "Aortic dissection", "Panic attack"], correctIndex: 3, explanation: "Dissection can cause neuro deficits from branch vessel involvement." },
  { id: 744, level: "Paramedic", category: "Clinical Judgment", text: "A patient has AMS with very low sodium suspected (seizures, hyponatremia). Best EMS focus is:", options: ["Give large free water", "Give diuretics", "Give aspirin", "Protect airway and treat seizures per protocol; rapid transport", "Give nitro"], correctIndex: 3, explanation: "Electrolyte emergencies require seizure control and airway protection with rapid definitive care." },
  { id: 745, level: "Paramedic", category: "Clinical Judgment", text: "A patient has severe bradycardia and hypotension after inferior MI. Most likely conduction issue is:", options: ["WPW", "SVT", "VF", "AV node ischemia causing bradycardia", "PE"], correctIndex: 3, explanation: "Inferior MI can affect AV node causing bradycardia and hypotension." },
  { id: 746, level: "Paramedic", category: "Clinical Judgment", text: "A patient has wheeze, hypotension, and warm flushed skin after bee sting. Shock type is:", options: ["Cardiogenic", "Hypovolemic", "Neurogenic", "Anaphylactic (distributive) shock", "Obstructive"], correctIndex: 3, explanation: "Anaphylaxis causes vasodilation and capillary leak leading to distributive shock." },
  { id: 747, level: "Paramedic", category: "Clinical Judgment", text: "A patient has abdominal pain, hypotension, and a pulsatile mass. Most concerning is:", options: ["Appendicitis", "Pancreatitis", "Renal colic", "Ruptured AAA", "GERD"], correctIndex: 3, explanation: "AAA rupture is life-threatening hemorrhage—rapid transport and shock management." },
  { id: 748, level: "Paramedic", category: "Clinical Judgment", text: "A patient has severe SOB, clear lungs, hypotension, and JVD. Best likely shock cause is:", options: ["Sepsis", "Hypovolemia", "Anaphylaxis", "Obstructive shock (tamponade/PE/tension) to be ruled out", "DKA"], correctIndex: 3, explanation: "Clear lungs + JVD + hypotension points to obstructive causes." },
  { id: 749, level: "Paramedic", category: "Clinical Judgment", text: "A patient has severe agitation, diaphoresis, tachycardia, and hypertension after stimulant use. Best first med class is:", options: ["Beta blocker first always", "Aspirin", "Furosemide", "Benzodiazepines per protocol", "Nitro"], correctIndex: 3, explanation: "Benzos reduce agitation and sympathetic surge in stimulant toxicity (per protocol)." },
  { id: 750, level: "Paramedic", category: "Clinical Judgment", text: "A patient has severe asthma and becomes bradycardic. This suggests:", options: ["Improvement", "Mild attack", "Normal response", "Impending respiratory arrest (late sign)", "Only anxiety"], correctIndex: 3, explanation: "Bradycardia in a tiring asthma patient is a late, pre-arrest sign." },
  { id: 751, level: "Paramedic", category: "Clinical Judgment", text: "A patient has chest pain relieved by sitting forward and worse with inspiration. Best diagnosis to consider is:", options: ["MI always", "PE always", "Pneumothorax always", "Pericarditis", "DKA"], correctIndex: 3, explanation: "Pericarditis pain is pleuritic and often relieved by leaning forward." },
  { id: 752, level: "Paramedic", category: "Clinical Judgment", text: "A patient has severe SOB with pink frothy sputum. The primary problem is:", options: ["Bronchospasm only", "Seizure", "GI bleed", "Fluid in alveoli impairing gas exchange (pulmonary edema)", "Hypoglycemia"], correctIndex: 3, explanation: "Pulmonary edema floods alveoli—use CPAP/afterload reduction per protocol." },
  { id: 753, level: "Paramedic", category: "Clinical Judgment", text: "A patient has nausea, sweating, and epigastric pain but no chest pain. EMS should:", options: ["Assume food poisoning only", "Delay ECG", "Give oral fluids only", "Consider atypical ACS and obtain ECG/monitor and treat per protocol", "Ignore vitals"], correctIndex: 3, explanation: "ACS can present atypically—especially with diaphoresis and epigastric discomfort." },
  { id: 754, level: "Paramedic", category: "Clinical Judgment", text: "A patient has sudden severe dyspnea with unilateral absent breath sounds and hypotension. The fastest lifesaving intervention is:", options: ["Diuretics", "Aspirin", "Albuterol", "Treat tension pneumothorax per protocol (decompression) while supporting ventilation", "Oral glucose"], correctIndex: 3, explanation: "Tension pneumothorax is immediately reversible and rapidly fatal if untreated." },
  { id: 755, level: "Paramedic", category: "Clinical Judgment", text: "A patient has altered mental status after insulin use and is diaphoretic. Most likely diagnosis is:", options: ["Stroke", "Sepsis", "Overdose", "Hypoglycemia", "AAA"], correctIndex: 3, explanation: "Diaphoresis and AMS after insulin strongly suggests hypoglycemia—check glucose and treat." },

  // ================= EMT CATEGORIES =================
  // 1) Patient Treatment (EMT) — 756–779
  { id: 756, level: "EMT", category: "Patient Treatment", text: "A patient is unresponsive with a pulse and gurgling respirations. Your first action is:", options: ["Give oral glucose", "Apply a c-collar", "Begin chest compressions", "Suction the airway", "Administer aspirin"], correctIndex: 3, explanation: "Gurgling indicates fluid in airway—suction to clear before ventilations/adjuncts." },
  { id: 757, level: "EMT", category: "Patient Treatment", text: "A child is in respiratory distress and becomes quiet with minimal air movement. Best immediate action is:", options: ["Encourage coughing", "Offer water", "Give oral glucose", "Assist ventilations with BVM and oxygen", "Apply ice to chest"], correctIndex: 3, explanation: "Minimal air movement is impending failure—support ventilation immediately." },
  { id: 758, level: "EMT", category: "Patient Treatment", text: "A patient with suspected stroke has SpO2 95% and no distress. Oxygen should be:", options: ["NRB at 15 L/min always", "Withheld forever", "Only if cyanotic", "Titrated per protocol; avoid routine high-flow if adequately oxygenated", "Given only after aspirin"], correctIndex: 3, explanation: "Give oxygen when indicated; avoid routine high-flow when saturation is adequate." },
  { id: 759, level: "EMT", category: "Patient Treatment", text: "A patient has severe external bleeding from a forearm laceration. First hemorrhage control is:", options: ["Tourniquet immediately over the wound", "Elevation only", "Pressure points only", "Direct pressure with dressing; escalate if not controlled", "Warm compress"], correctIndex: 3, explanation: "Start with direct pressure; escalate to tourniquet if life-threatening bleeding persists." },
  { id: 760, level: "EMT", category: "Patient Treatment", text: "A patient with suspected opioid overdose is breathing 6/min. The best first intervention is:", options: ["Naloxone first always", "Give aspirin", "Give oral glucose", "Ventilate with BVM + oxygen", "Place supine and wait"], correctIndex: 3, explanation: "Airway/ventilation first; naloxone comes after ventilation support per protocol." },
  { id: 761, level: "EMT", category: "Patient Treatment", text: "A conscious adult is choking and cannot speak or cough. Best action is:", options: ["Back blows only", "Give water", "Blind finger sweep", "Abdominal thrusts", "Start CPR immediately"], correctIndex: 3, explanation: "Severe obstruction in conscious adult: abdominal thrusts until relieved or unresponsive." },
  { id: 762, level: "EMT", category: "Patient Treatment", text: "A patient has a chemical splash in the eye. Best immediate care is:", options: ["Patch both eyes and wait", "Neutralize with vinegar", "Apply ointment", "Irrigate continuously with water/saline while transporting", "Rub the eye to remove chemical"], correctIndex: 3, explanation: "Copious irrigation is the priority for chemical eye injuries." },
  { id: 763, level: "EMT", category: "Patient Treatment", text: "A patient with chest pain has taken sildenafil today. They request nitroglycerin. You should:", options: ["Assist with nitro anyway if pain is severe", "Give double dose nitro", "Give nitro only if BP > 140", "Withhold nitro and contact medical direction", "Give oral glucose"], correctIndex: 3, explanation: "Nitro + PDE-5 inhibitors can cause profound hypotension; follow protocol/medical direction." },
  { id: 764, level: "EMT", category: "Patient Treatment", text: "A patient is actively seizing. Best EMT care is:", options: ["Restrain limbs", "Put an object in mouth", "Give oral glucose during seizure", "Protect from injury, maintain airway, suction as needed, time seizure", "Start CPR immediately"], correctIndex: 3, explanation: "Do not restrain or put objects in mouth; focus on safety and airway." },
  { id: 765, level: "EMT", category: "Patient Treatment", text: "A partial-thickness burn to the forearm should be treated by:", options: ["Breaking blisters", "Applying butter", "Scrubbing the burn", "Cooling briefly and covering with dry sterile dressing", "Applying ice directly for 20 minutes"], correctIndex: 3, explanation: "Cool with clean water briefly and cover dry/sterile; don’t apply ointments or break blisters." },
  { id: 766, level: "EMT", category: "Patient Treatment", text: "A patient has a nosebleed without trauma. Best care is:", options: ["Tilt head back", "Lie supine", "Give aspirin", "Pinch nostrils and lean forward", "Pack deep into throat"], correctIndex: 3, explanation: "Lean forward and pinch nostrils to reduce bleeding and prevent aspiration." },
  { id: 767, level: "EMT", category: "Patient Treatment", text: "A suspected spinal-injury patient vomits while supine. Best action is:", options: ["Sit patient upright", "Remove c-collar", "Ignore vomiting", "Log roll as a unit to clear airway/suction", "Give oral fluids"], correctIndex: 3, explanation: "Protect airway while maintaining spinal alignment—log roll as a unit." },
  { id: 768, level: "EMT", category: "Patient Treatment", text: "A patient with asthma has wheezing and increased work of breathing and a prescribed inhaler. EMT should:", options: ["Tell them to stop using it", "Give nitro", "Give antibiotics", "Assist with prescribed bronchodilator per protocol", "Perform abdominal thrusts"], correctIndex: 3, explanation: "Assisting with prescribed bronchodilator is appropriate for bronchospasm per protocol." },
  { id: 769, level: "EMT", category: "Patient Treatment", text: "A patient has an amputated finger. Best handling of the part is:", options: ["Place directly on ice", "Scrub with antiseptic", "Tape it back on", "Wrap in moist sterile gauze, seal in bag, cool bag (do not freeze)", "Leave it exposed"], correctIndex: 3, explanation: "Moist sterile wrap + bag + indirect cooling preserves tissue." },
  { id: 770, level: "EMT", category: "Patient Treatment", text: "A patient is in shock after trauma. Best general positioning is:", options: ["Sitting upright", "Walking", "Prone", "Supine (if tolerated) and keep warm", "Trendelenburg always"], correctIndex: 3, explanation: "Supine positioning and warming help perfusion; rapid transport is key." },
  { id: 771, level: "EMT", category: "Patient Treatment", text: "Heat stroke is suspected (hot skin, AMS). Best action is:", options: ["Warm blankets", "Give aspirin for fever", "Delay transport until cooled fully", "Active cooling and rapid transport", "Oral fluids only"], correctIndex: 3, explanation: "Heat stroke is life-threatening; start cooling and transport immediately." },
  { id: 772, level: "EMT", category: "Patient Treatment", text: "Hypothermia patient is cold and confused. Best handling is:", options: ["Rough handling to stimulate", "Rub extremities vigorously", "Encourage brisk walking", "Gentle handling, remove wet clothing, warm gradually, transport", "Give alcohol"], correctIndex: 3, explanation: "Handle gently and prevent further heat loss; rewarm gradually." },
  { id: 773, level: "EMT", category: "Patient Treatment", text: "A patient with suspected MI and no contraindications should receive:", options: ["Ibuprofen", "Diphenhydramine", "Albuterol", "Chewable aspirin per protocol", "Oral glucose"], correctIndex: 3, explanation: "Aspirin reduces platelet aggregation in suspected ACS when not contraindicated." },
  { id: 774, level: "EMT", category: "Patient Treatment", text: "A patient with suspected stroke. The MOST important action is:", options: ["Give aspirin on scene", "Delay transport for repeated exams", "Give nitro", "Rapid transport to stroke center with pre-notification and last-known-well time", "Give oral glucose without checking"], correctIndex: 3, explanation: "Stroke care is time-dependent; transport and pre-notify with onset time." },
  { id: 775, level: "EMT", category: "Patient Treatment", text: "A patient has an open chest wound. Best dressing is:", options: ["Dry gauze taped on all sides", "Tight elastic wrap around chest", "Wet gauze only", "Occlusive dressing and monitor for tension", "Tourniquet"], correctIndex: 3, explanation: "Seal the wound to prevent air entry; monitor for tension pneumothorax signs." },
  { id: 776, level: "EMT", category: "Patient Treatment", text: "A patient has suspected CHF with severe dyspnea and crackles. Best initial oxygen support is:", options: ["Room air only", "Paper bag", "Oral glucose", "NRB (or CPAP if available/allowed) per protocol", "No transport"], correctIndex: 3, explanation: "Provide high-concentration oxygen; CPAP can help if trained/allowed and patient cooperative." },
  { id: 777, level: "EMT", category: "Patient Treatment", text: "A child has stridor at rest (croup-like) but is alert. Best approach is:", options: ["Force NRB tightly", "Make them lie flat", "Give oral glucose", "Keep child calm and give blow-by oxygen", "Do abdominal thrusts"], correctIndex: 3, explanation: "Minimize agitation and provide gentle oxygen; distress can worsen stridor." },
  { id: 778, level: "EMT", category: "Patient Treatment", text: "A patient with suspected poisoning is drowsy with an empty pill bottle. Best action is:", options: ["Induce vomiting", "Give activated charcoal automatically", "Delay transport to search house", "Support ABCs and contact poison control/medical direction per protocol", "Give aspirin"], correctIndex: 3, explanation: "Airway support and expert guidance are key; do not induce vomiting." },
  { id: 779, level: "EMT", category: "Patient Treatment", text: "A tourniquet is applied for extremity hemorrhage. Best practice is:", options: ["Loosen every 10 minutes", "Place over the wound", "Place distal to wound", "Document time and do not loosen unless directed by protocol", "Remove once bleeding slows"], correctIndex: 3, explanation: "Do not periodically loosen; record time and reassess for bleeding." },

  // 2) Primary Assessment (EMT) — 780–797
  { id: 780, level: "EMT", category: "Primary Assessment", text: "After scene safety, your first patient step is:", options: ["Full SAMPLE history", "Full head-to-toe", "Auscultate lungs", "General impression and assess responsiveness", "Check blood glucose"], correctIndex: 3, explanation: "Primary assessment begins with general impression and responsiveness." },
  { id: 781, level: "EMT", category: "Primary Assessment", text: "Snoring respirations most often indicate:", options: ["Fluid in airway", "Lung edema", "Hyperventilation", "Tongue obstruction; open airway (jaw-thrust if trauma)", "Normal breathing"], correctIndex: 3, explanation: "Snoring suggests upper airway obstruction by the tongue—open airway immediately." },
  { id: 782, level: "EMT", category: "Primary Assessment", text: "An unresponsive patient with suspected trauma needs airway opening. Best maneuver is:", options: ["Head-tilt chin-lift", "Valsalva", "Abdominal thrusts", "Jaw-thrust with manual stabilization", "Blind finger sweep"], correctIndex: 3, explanation: "Jaw-thrust minimizes cervical movement while opening the airway." },
  { id: 783, level: "EMT", category: "Primary Assessment", text: "Gurgling respirations indicate:", options: ["Lower airway wheeze", "Normal breathing", "Anxiety", "Airway fluid/secretions requiring suction", "Hyperglycemia"], correctIndex: 3, explanation: "Gurgling is fluid in the airway—suction immediately." },
  { id: 784, level: "EMT", category: "Primary Assessment", text: "A patient is unresponsive with no normal breathing and no pulse. Next action is:", options: ["Full history", "Oxygen by nasal cannula", "Wait for ALS", "Start CPR and apply AED as soon as available", "Give oral glucose"], correctIndex: 3, explanation: "Cardiac arrest requires immediate CPR and early defibrillation when indicated." },
  { id: 785, level: "EMT", category: "Primary Assessment", text: "Absent radial pulses with cool pale skin most suggests:", options: ["Normal perfusion", "Hypertension", "Stable condition", "Poor perfusion/shock", "Hyperglycemia"], correctIndex: 3, explanation: "Pulse and skin signs indicate perfusion; absent radial pulse suggests poor perfusion." },
  { id: 786, level: "EMT", category: "Primary Assessment", text: "A patient’s breathing is shallow at RR 10 with SpO2 90%. Best action is:", options: ["Nasal cannula only", "Encourage deep breaths", "No intervention", "Assist ventilations with BVM", "Give aspirin"], correctIndex: 3, explanation: "Inadequate breathing requires assisted ventilation, not low-flow oxygen alone." },
  { id: 787, level: "EMT", category: "Primary Assessment", text: "In the primary assessment, life-threatening bleeding is controlled:", options: ["After vitals", "After OPQRST", "After SAMPLE", "Immediately when found", "Only after ALS arrives"], correctIndex: 3, explanation: "Major hemorrhage is controlled immediately during primary assessment." },
  { id: 788, level: "EMT", category: "Primary Assessment", text: "A patient is responsive to pain only on AVPU. This is:", options: ["Alert", "Verbal", "Unresponsive", "Pain", "Oriented"], correctIndex: 3, explanation: "AVPU: Alert, Verbal, Pain, Unresponsive." },
  { id: 789, level: "EMT", category: "Primary Assessment", text: "The best sign that ventilations are effective is:", options: ["Gastric sounds", "Patient coughing", "Pink lips only", "Visible chest rise with each ventilation", "Fast heart rate"], correctIndex: 3, explanation: "Chest rise indicates air entering lungs; avoid gastric insufflation." },
  { id: 790, level: "EMT", category: "Primary Assessment", text: "A patient is alert, speaking full sentences, normal skin, SpO2 99%. Priority is:", options: ["Immediate CPR", "Rapid transport lights/sirens", "Needle decompression", "Routine assessment and appropriate transport", "Defibrillate"], correctIndex: 3, explanation: "No immediate life threats—proceed with standard assessment and care." },
  { id: 791, level: "EMT", category: "Primary Assessment", text: "A patient with severe allergic reaction has lip swelling and wheezing. This is:", options: ["Mild reaction", "Only anxiety", "Low blood sugar", "Anaphylaxis (life threat)", "Normal breathing"], correctIndex: 3, explanation: "Airway swelling and wheeze indicate anaphylaxis—treat rapidly per protocol." },
  { id: 792, level: "EMT", category: "Primary Assessment", text: "A child with nasal flaring and retractions is showing:", options: ["Normal breathing", "Only fever", "Only pain", "Severe increased work of breathing", "Stable airway"], correctIndex: 3, explanation: "Retractions/flaring are signs of significant respiratory distress in children." },
  { id: 793, level: "EMT", category: "Primary Assessment", text: "An OPA is indicated when the patient is:", options: ["Alert and talking", "Semi-conscious with gag reflex", "Crying child", "Unresponsive without a gag reflex", "Able to swallow"], correctIndex: 3, explanation: "OPAs are for unresponsive patients without a gag reflex." },
  { id: 794, level: "EMT", category: "Primary Assessment", text: "A trauma patient needs rapid transport most when they have:", options: ["Small abrasion", "Mild ankle sprain", "Stable headache", "Altered mental status with hypotension", "Chronic back pain"], correctIndex: 3, explanation: "AMS + hypotension suggests shock/critical injury—transport rapidly." },
  { id: 795, level: "EMT", category: "Primary Assessment", text: "If you find a patient unresponsive, breathing normally, pulse present, and no trauma, you should:", options: ["Start compressions", "Give aspirin", "Perform abdominal thrusts", "Place in recovery position and monitor airway", "Stop assessment"], correctIndex: 3, explanation: "Recovery position helps protect airway from aspiration when no trauma is suspected." },
  { id: 796, level: "EMT", category: "Primary Assessment", text: "In primary assessment, circulation check includes:", options: ["Only blood glucose", "Only lung sounds", "Only pupil exam", "Major bleeding control and pulse/skin perfusion assessment", "Only OPQRST"], correctIndex: 3, explanation: "Circulation focuses on hemorrhage control and perfusion (pulse/skin signs)." },
  { id: 797, level: "EMT", category: "Primary Assessment", text: "A patient cannot speak, has no cough, and is silent with hands at throat. This suggests:", options: ["Mild obstruction", "Normal breathing", "Hyperventilation", "Severe airway obstruction", "Heat exhaustion"], correctIndex: 3, explanation: "Silent inability to speak/cough indicates severe obstruction requiring immediate intervention." },

  // 3) Secondary Assessment (EMT) — 798–811
  { id: 798, level: "EMT", category: "Secondary Assessment", text: "OPQRST is used to assess:", options: ["Hazards on scene", "Pulse oximetry", "Medication allergies", "Pain/symptoms", "Ambulance operations"], correctIndex: 3, explanation: "OPQRST structures symptom assessment (onset, provocation, quality, radiation, severity, time)." },
  { id: 799, level: "EMT", category: "Secondary Assessment", text: "SAMPLE history includes all EXCEPT:", options: ["Signs/symptoms", "Allergies", "Medications", "Pulse oximetry", "Past history"], correctIndex: 3, explanation: "Pulse oximetry is a vital sign, not part of SAMPLE." },
  { id: 800, level: "EMT", category: "Secondary Assessment", text: "DCAP-BTLS is primarily for identifying:", options: ["Medication contraindications", "Stroke onset time", "Blood glucose trends", "Trauma findings on physical exam", "Insurance status"], correctIndex: 3, explanation: "DCAP-BTLS helps find injuries like deformities, tenderness, lacerations, swelling, etc." },
  { id: 801, level: "EMT", category: "Secondary Assessment", text: "A patient has chest pressure radiating to left arm with diaphoresis. Most consistent with:", options: ["Kidney stone", "Appendicitis", "Heat exhaustion", "Cardiac ischemia/ACS", "Urticaria"], correctIndex: 3, explanation: "Classic ACS pattern: pressure-like pain with radiation and diaphoresis." },
  { id: 802, level: "EMT", category: "Secondary Assessment", text: "The most important time question in stroke assessment is:", options: ["Last meal", "Last bowel movement", "Last exercise", "Last known well (symptom onset time)", "Last coffee"], correctIndex: 3, explanation: "Stroke treatment eligibility depends on last known well time." },
  { id: 803, level: "EMT", category: "Secondary Assessment", text: "Hypoglycemia can mimic stroke, so you should always:", options: ["Give aspirin first", "Give nitro first", "Ignore glucose", "Check blood glucose early", "Delay transport"], correctIndex: 3, explanation: "Blood glucose is a key stroke mimic and is rapidly treatable." },
  { id: 804, level: "EMT", category: "Secondary Assessment", text: "A patient has black, tarry stools. This suggests:", options: ["Dehydration", "Asthma", "Stroke", "Upper GI bleed (melena)", "Allergic reaction"], correctIndex: 3, explanation: "Melena indicates digested blood from upper GI bleeding." },
  { id: 805, level: "EMT", category: "Secondary Assessment", text: "A patient has fruity breath and deep rapid respirations. This suggests:", options: ["Opioid overdose", "CHF", "Stroke", "Diabetic ketoacidosis", "Anaphylaxis"], correctIndex: 3, explanation: "Fruity breath and Kussmaul respirations are classic DKA signs." },
  { id: 806, level: "EMT", category: "Secondary Assessment", text: "Stridor most strongly indicates:", options: ["Lower airway disease", "Normal breathing", "GI bleed", "Upper airway obstruction", "Hyperglycemia"], correctIndex: 3, explanation: "Stridor is a high-pitched sound from upper airway narrowing." },
  { id: 807, level: "EMT", category: "Secondary Assessment", text: "Subcutaneous emphysema feels like:", options: ["Smooth swelling", "Hard bone", "Warm rash", "Crackling ‘Rice Krispies’ under skin", "Soft edema only"], correctIndex: 3, explanation: "Crepitus under skin indicates air in soft tissues from lung/airway injury." },
  { id: 808, level: "EMT", category: "Secondary Assessment", text: "Capillary refill is least reliable in:", options: ["Warm indoor settings", "Hydrated adults", "Resting patient", "Cold exposure", "Normal room temp"], correctIndex: 3, explanation: "Cold causes vasoconstriction and can falsely prolong refill time." },
  { id: 809, level: "EMT", category: "Secondary Assessment", text: "A patient is post-seizure and sleepy but breathing adequately. This is:", options: ["Malingering", "Stroke", "Anaphylaxis", "Postictal state", "Heat stroke"], correctIndex: 3, explanation: "Postictal period is normal after seizures—confusion and fatigue are expected." },
  { id: 810, level: "EMT", category: "Secondary Assessment", text: "When palpating abdomen, best technique is:", options: ["Start at painful area", "Deep palpation first", "Punch quickly", "Palpate gently, starting away from pain", "Skip abdomen always"], correctIndex: 3, explanation: "Start away from pain and palpate gently to reduce guarding and worsening pain." },
  { id: 811, level: "EMT", category: "Secondary Assessment", text: "Best practice for vitals in ongoing care is:", options: ["One set only", "Only document abnormal values", "Estimate BP", "Trend and reassess at appropriate intervals", "Skip mental status"], correctIndex: 3, explanation: "Trending vitals shows deterioration and response to interventions." },

  // 4) Scene Size-Up (EMT) — 812–818
  { id: 812, level: "EMT", category: "Scene Size-Up", text: "Your FIRST priority on arrival is:", options: ["Immediate history", "Diagnose the condition", "Start transport immediately", "Scene safety and PPE", "Call medical control"], correctIndex: 3, explanation: "Scene safety and PPE come first to prevent rescuer injury." },
  { id: 813, level: "EMT", category: "Scene Size-Up", text: "At a HazMat scene, the safest approach is:", options: ["Approach downwind", "Approach to read labels closely", "Enter to rescue immediately", "Stage upwind/uphill/upstream and await HazMat guidance", "Park 10 feet away"], correctIndex: 3, explanation: "Stage safely to avoid exposure until the scene is declared safe." },
  { id: 814, level: "EMT", category: "Scene Size-Up", text: "The best predictor of hidden trauma is:", options: ["Time of day", "Car color", "Patient’s job", "Mechanism of injury", "Patient’s favorite sport"], correctIndex: 3, explanation: "MOI guides suspicion for internal injuries and transport decisions." },
  { id: 815, level: "EMT", category: "Scene Size-Up", text: "In an unsafe violent scene, you should:", options: ["Enter quickly to help", "Disarm the person", "Argue to calm them", "Stage and wait for law enforcement to secure scene", "Park closer to be faster"], correctIndex: 3, explanation: "Do not enter unsafe scenes; wait until secured." },
  { id: 816, level: "EMT", category: "Scene Size-Up", text: "If you smell natural gas strongly, you should:", options: ["Turn on lights", "Proceed inside", "Use a match to confirm", "Stage away and request fire/utility response", "Ventilate with fans"], correctIndex: 3, explanation: "Gas leak is an explosion hazard—stage and request trained responders." },
  { id: 817, level: "EMT", category: "Scene Size-Up", text: "If carbon monoxide exposure is suspected, first action is:", options: ["Stay inside to treat", "Ignore if patient is awake", "Give aspirin", "Move to fresh air and request fire department; give oxygen", "Give oral glucose"], correctIndex: 3, explanation: "Remove from exposure and provide oxygen; scene safety requires fire response." },
  { id: 818, level: "EMT", category: "Scene Size-Up", text: "A key reason to determine number of patients early is to:", options: ["Reduce paperwork", "Choose hospital cafeteria", "Avoid triage", "Request adequate resources/ambulances early", "Delay care"], correctIndex: 3, explanation: "Early resource requests prevent delays in multi-patient incidents." },

  // 5) EMS Operations (EMT) — 819–823
  { id: 819, level: "EMT", category: "EMS Operations", text: "Consent for an unconscious adult needing lifesaving care is:", options: ["Written consent required first", "Not allowed without family", "Only verbal consent", "Implied consent", "Refusal automatically"], correctIndex: 3, explanation: "Unconscious patients are treated under implied consent in emergencies." },
  { id: 820, level: "EMT", category: "EMS Operations", text: "A competent adult refuses transport. EMT should:", options: ["Force transport", "Leave with no documentation", "Call media", "Confirm capacity, explain risks, document refusal with signatures/witness per policy", "Take their ID"], correctIndex: 3, explanation: "Refusals require capacity and informed understanding; document thoroughly." },
  { id: 821, level: "EMT", category: "EMS Operations", text: "HIPAA generally permits sharing patient info:", options: ["With friends", "On social media if no name", "With anyone who asks", "For treatment/operations or as required by law", "Only with the news"], correctIndex: 3, explanation: "Disclose only what’s necessary for care/operations or legal requirements." },
  { id: 822, level: "EMT", category: "EMS Operations", text: "Leaving a patient after starting care without transfer or refusal is:", options: ["Good practice", "Required for speed", "No issue if busy", "Abandonment", "Informed consent"], correctIndex: 3, explanation: "You must transfer care appropriately or document refusal to avoid abandonment." },
  { id: 823, level: "EMT", category: "EMS Operations", text: "Best way to reduce infection transmission is:", options: ["Wear same gloves all day", "Skip cleaning equipment", "Use antibiotics routinely", "Hand hygiene and proper disinfection of equipment", "Avoid all patients"], correctIndex: 3, explanation: "Hand hygiene and decontamination are the core infection-control practices." },
    // ===== NEXT 300 QUESTIONS (IDs 824–1123) =====

  // ================= EMT CATEGORIES =================

  // 1) Trauma (EMT) — 824–853
  { id: 824, level: "EMT", category: "Trauma", text: "A patient has an open chest wound with a sucking sound during inspiration. The BEST immediate intervention is:", options: ["Pack the wound tightly with gauze", "Apply direct pressure only", "Place the patient supine and transport", "Apply an occlusive dressing taped on all four sides", "Apply an occlusive dressing taped on three sides"], correctIndex: 4, explanation: "A 3-sided occlusive dressing helps prevent air entry while allowing air to escape, reducing risk of tension pneumothorax." },
  { id: 825, level: "EMT", category: "Trauma", text: "After a fall, a patient has unequal pupils and vomiting. Your transport decision should be:", options: ["Non-emergent transport after splinting", "Delay transport for a full history", "Transport to the closest clinic", "Rapid transport with frequent reassessment", "Allow the patient to rest and reassess later"], correctIndex: 3, explanation: "Unequal pupils and vomiting suggest serious head injury—minimize scene time and transport rapidly." },
  { id: 826, level: "EMT", category: "Trauma", text: "A patient has a flail chest segment and severe dyspnea. The BEST EMT management is:", options: ["Apply a tourniquet to the chest", "Ventilate at 30/min to improve oxygenation", "Tape the flail segment down tightly with circumferential wrap", "Provide oxygen, assist ventilations as needed, and stabilize the segment with bulky dressing", "Perform abdominal thrusts"], correctIndex: 3, explanation: "Support oxygenation/ventilation; bulky dressing can help stabilize the flail segment without restricting overall chest expansion." },
  { id: 827, level: "EMT", category: "Trauma", text: "A long bone fracture has severe bleeding that continues despite direct pressure. Next step is:", options: ["Ice pack and elevation only", "Pressure points only", "Loosen pressure to check frequently", "Apply a tourniquet proximal to the bleeding site", "Wait for ALS before doing anything else"], correctIndex: 3, explanation: "Life-threatening extremity hemorrhage not controlled by pressure requires a tourniquet per protocol." },
  { id: 828, level: "EMT", category: "Trauma", text: "Which finding MOST strongly suggests internal bleeding after blunt trauma?", options: ["Warm, flushed skin", "Localized pain only", "Stable vital signs with anxiety", "Cool clammy skin with tachycardia and falling BP", "Itching and hives"], correctIndex: 3, explanation: "Shock signs after trauma strongly indicate internal hemorrhage until proven otherwise." },
  { id: 829, level: "EMT", category: "Trauma", text: "A patient has an impaled object in the thigh. The correct management is to:", options: ["Remove it quickly to stop bleeding", "Rock it side-to-side to free it", "Cut it flush with the skin", "Stabilize it in place with bulky dressings and control bleeding", "Push it deeper to reduce movement"], correctIndex: 3, explanation: "Do not remove impaled objects in the field; stabilize and control bleeding around it." },
  { id: 830, level: "EMT", category: "Trauma", text: "A patient has evisceration after a stabbing. The BEST dressing is:", options: ["Dry sterile dressing with firm pressure", "Tight abdominal binder with direct pressure on organs", "Occlusive dressing taped on 4 sides", "Moist sterile dressing covered with an occlusive layer", "Leave organs exposed to air to dry"], correctIndex: 3, explanation: "Cover exposed organs with moist sterile dressing and an occlusive layer to prevent drying and contamination." },
  { id: 831, level: "EMT", category: "Trauma", text: "For suspected pelvic fracture with shock signs, the BEST EMT action is:", options: ["Roll the patient repeatedly to assess stability", "Apply traction splint to both legs", "Encourage the patient to stand to test pain", "Minimize movement, apply pelvic stabilization if available, rapid transport", "Give oral fluids to raise BP"], correctIndex: 3, explanation: "Pelvic fractures can bleed massively; minimize movement, stabilize, and transport rapidly." },
  { id: 832, level: "EMT", category: "Trauma", text: "A patient with suspected spine injury needs to be moved from immediate danger. Best move is:", options: ["Standard carry with arms around shoulders", "Lift by the wrists and ankles", "Rapid extrication with manual stabilization", "Sit the patient upright to walk out", "Roll patient onto stomach and drag"], correctIndex: 2, explanation: "In immediate danger, perform rapid extrication with manual stabilization and minimal movement." },
  { id: 833, level: "EMT", category: "Trauma", text: "A patient has severe facial trauma and blood pooling in the airway. BEST immediate airway action is:", options: ["Insert an OPA without clearing the airway", "Give oral glucose for AMS", "Apply CPAP", "Suction, position, and ventilate as needed", "Delay airway care until hospital"], correctIndex: 3, explanation: "Clear the airway first (suction/position), then support ventilation/oxygenation." },
  { id: 834, level: "EMT", category: "Trauma", text: "Which is a contraindication to a traction splint?", options: ["Isolated mid-shaft femur fracture", "Severe thigh pain", "Shortened, externally rotated leg", "Injury involving the pelvis or knee joint", "Muscle spasm in the thigh"], correctIndex: 3, explanation: "Traction splints are for isolated femur shaft fractures; pelvic/knee injury is a contraindication." },
  { id: 835, level: "EMT", category: "Trauma", text: "A patient’s forearm has pain, pallor, paresthesia, and pain with passive stretch after a crush injury. This suggests:", options: ["Cellulitis", "Simple contusion", "Tendon strain", "Compartment syndrome", "Heat exhaustion"], correctIndex: 3, explanation: "The '5 P’s' with severe pain (especially with passive stretch) suggests compartment syndrome—urgent transport." },
  { id: 836, level: "EMT", category: "Trauma", text: "A patient has a suspected basilar skull fracture. A common sign is:", options: ["Hives and wheezing", "Bright red blood from nose only", "Unequal chest rise", "CSF leakage from nose/ears or periorbital ecchymosis", "Warm dry skin"], correctIndex: 3, explanation: "Basilar skull fracture may cause CSF rhinorrhea/otorrhea and bruising (raccoon eyes/Battle sign)." },
  { id: 837, level: "EMT", category: "Trauma", text: "For a patient with an amputated hand and uncontrolled bleeding, BEST hemorrhage control is:", options: ["Elevation only", "Pressure points only", "Ice directly on the stump", "Direct pressure and tourniquet proximal if needed", "Loosen pressure every 5 minutes"], correctIndex: 3, explanation: "Control life-threatening bleeding with direct pressure and tourniquet if necessary; do not periodically loosen." },
  { id: 838, level: "EMT", category: "Trauma", text: "A patient has an open fracture with bone protruding. You should:", options: ["Push the bone back in", "Irrigate aggressively with high-pressure stream", "Apply traction until bone retracts", "Cover with a sterile dressing, control bleeding, and splint", "Leave uncovered to “air out”"], correctIndex: 3, explanation: "Cover with sterile dressing, control bleeding, and immobilize; do not push bone back in." },
  { id: 839, level: "EMT", category: "Trauma", text: "After a collision, a patient has JVD, severe dyspnea, and absent breath sounds on the right. EMT priority is:", options: ["Oral glucose", "Aspirin", "Rapid transport and support ventilation/oxygenation", "Delay for detailed neuro exam", "Encourage walking to ambulance"], correctIndex: 2, explanation: "Findings suggest tension pneumothorax—support ABCs and rapid transport (ALS intercept per policy)." },
  { id: 840, level: "EMT", category: "Trauma", text: "In a trauma patient, which finding MOST strongly suggests shock?", options: ["BP 140/90", "Warm skin and bounding pulse", "RR 16 and calm", "Cool clammy skin with weak rapid pulse", "Pain 3/10"], correctIndex: 3, explanation: "Cool, clammy skin with weak tachycardic pulse indicates poor perfusion/shock." },
  { id: 841, level: "EMT", category: "Trauma", text: "A burn patient has singed nasal hairs and soot in the mouth. This suggests:", options: ["Simple sunburn", "Only skin involvement", "Low risk airway", "Inhalation injury risk", "Dehydration only"], correctIndex: 3, explanation: "Soot/singed hairs indicate smoke inhalation—airway risk and high-priority transport." },
  { id: 842, level: "EMT", category: "Trauma", text: "For a chemical burn on skin, initial treatment is:", options: ["Neutralize with vinegar", "Cover with ointment immediately", "Scrub vigorously with brush", "Brush off dry chemicals and irrigate with copious water", "Apply ice directly for 20 minutes"], correctIndex: 3, explanation: "Remove dry chemical first, then irrigate; do not attempt neutralization in the field." },
  { id: 843, level: "EMT", category: "Trauma", text: "A patient has an avulsed tooth. Best care for the tooth is:", options: ["Store dry in gauze", "Scrub it clean with alcohol", "Wrap in a dry towel", "Place in milk or appropriate solution and transport", "Freeze it on ice directly"], correctIndex: 3, explanation: "Keep the tooth moist (milk/saline/tooth preservation solution) and transport promptly." },
  { id: 844, level: "EMT", category: "Trauma", text: "A patient has a penetrating eye injury with an embedded object. You should:", options: ["Remove the object carefully", "Apply direct pressure to stop bleeding", "Patch only the injured eye", "Stabilize the object, cover BOTH eyes, and transport", "Flush with high-pressure water stream"], correctIndex: 3, explanation: "Stabilize, avoid pressure, cover both eyes to reduce eye movement, and transport." },
  { id: 845, level: "EMT", category: "Trauma", text: "Which is the BEST reason to reassess distal pulses after splinting?", options: ["To document insurance", "To prove the patient is faking", "To decide hospital destination only", "To ensure neurovascular status wasn’t compromised", "To reduce pain automatically"], correctIndex: 3, explanation: "Splints can impair circulation/nerve function; reassess PMS after immobilization." },
  { id: 846, level: "EMT", category: "Trauma", text: "A patient is struck by lightning and is apneic with a pulse. You should:", options: ["Assume death and move on", "Treat only burns", "Do nothing until ALS arrives", "Ventilate with BVM and manage airway", "Give oral fluids"], correctIndex: 3, explanation: "Lightning can cause respiratory arrest with pulse—ventilation support is critical." },
  { id: 847, level: "EMT", category: "Trauma", text: "A patient has severe bleeding from a scalp laceration. Best bleeding control is:", options: ["Tourniquet around the head", "Ignore because scalp bleeds a lot", "Apply heat to constrict vessels", "Direct pressure with sterile dressing", "Pack the wound with dirt to clot"], correctIndex: 3, explanation: "Scalp wounds can bleed heavily; use direct pressure and dressing." },
  { id: 848, level: "EMT", category: "Trauma", text: "A patient is trapped with a crush injury for several hours and is now freed. Best EMT priority is:", options: ["Force the patient to walk", "Massage the limb aggressively", "Delay transport to complete splinting", "Treat ABCs, manage shock, rapid transport, ALS intercept if available", "Give large amounts of oral fluids quickly"], correctIndex: 3, explanation: "Crush injuries can cause life-threatening complications; prioritize ABCs and rapid transport." },
  { id: 849, level: "EMT", category: "Trauma", text: "A patient has a suspected femur fracture and absent distal pulse after splinting. You should FIRST:", options: ["Ignore it if pain improved", "Remove the tourniquet", "Apply ice and recheck later", "Reposition/splint adjustment per protocol and reassess pulses", "Give aspirin"], correctIndex: 3, explanation: "Absent distal pulses suggest compromised circulation—adjust immobilization and reassess immediately." },
  { id: 850, level: "EMT", category: "Trauma", text: "Signs of hypovolemic shock in children often appear FIRST as:", options: ["Hypotension early", "Bradycardia early", "Normal skin and calm behavior", "Tachycardia and delayed cap refill", "Fixed dilated pupils"], correctIndex: 3, explanation: "Children compensate; tachycardia and delayed cap refill are early indicators—hypotension is late." },
  { id: 851, level: "EMT", category: "Trauma", text: "A patient has a partial airway obstruction with stridor after trauma. You should:", options: ["Perform blind finger sweep", "Give water to drink", "Ignore if SpO2 is normal", "Provide oxygen, minimize agitation, prepare for rapid transport", "Force OPA placement"], correctIndex: 3, explanation: "Stridor suggests upper airway narrowing; support oxygenation, avoid agitation, and transport rapidly." },
  { id: 852, level: "EMT", category: "Trauma", text: "A patient has suspected spinal injury and is vomiting. Best airway protection is:", options: ["Remove c-collar and sit upright", "Head-tilt chin-lift only", "Give antiemetic and wait", "Log roll as a unit and suction", "Ignore vomiting if pulse present"], correctIndex: 3, explanation: "Protect airway while maintaining motion restriction: log roll and suction." },
  { id: 853, level: "EMT", category: "Trauma", text: "A patient with blunt abdominal trauma has increasing abdominal distention and tachycardia. This suggests:", options: ["Stable condition", "Simple muscle strain", "Allergic reaction", "Internal bleeding", "Hyperventilation syndrome"], correctIndex: 3, explanation: "Distention and shock signs after blunt trauma indicate internal hemorrhage until proven otherwise." },

  // 2) Medical Emergencies (EMT) — 854–883
  { id: 854, level: "EMT", category: "Medical Emergencies", text: "A patient with diabetes is lethargic and has fruity breath with deep rapid respirations. This MOST suggests:", options: ["Opioid overdose", "Heat cramps", "DKA", "Stroke", "CHF"], correctIndex: 2, explanation: "Fruity breath and Kussmaul respirations are classic for diabetic ketoacidosis." },
  { id: 855, level: "EMT", category: "Medical Emergencies", text: "A patient has sudden severe tearing abdominal/back pain and is hypotensive. Most concerning cause is:", options: ["Gallstones", "Kidney infection", "Pancreatitis only", "Abdominal aortic aneurysm", "GERD"], correctIndex: 3, explanation: "Severe tearing pain with hypotension suggests AAA—time-critical emergency." },
  { id: 856, level: "EMT", category: "Medical Emergencies", text: "A patient has wheezing, hives, and hypotension after eating shellfish. Best immediate action is:", options: ["Oral glucose", "Cold pack", "Assist with epinephrine auto-injector if available", "Aspirin", "Nebulized saline only"], correctIndex: 2, explanation: "Anaphylaxis requires epinephrine early; airway/breathing and rapid transport are priorities." },
  { id: 857, level: "EMT", category: "Medical Emergencies", text: "A patient with chest pain is pale and diaphoretic. The MOST important first step is to:", options: ["Give nitro immediately", "Give ibuprofen", "Assess ABCs and obtain vitals/SpO2", "Have the patient walk around", "Give oral glucose regardless"], correctIndex: 2, explanation: "Start with ABCs and vital assessment to guide safe interventions and transport priority." },
  { id: 858, level: "EMT", category: "Medical Emergencies", text: "A COPD patient is on home oxygen. Their SpO2 is 90% and they are not in severe distress. Oxygen should be:", options: ["Withheld completely", "High-flow NRB always", "Titrated to maintain adequate oxygenation per protocol", "Given only after albuterol", "Given only if cyanotic"], correctIndex: 2, explanation: "COPD patients may need controlled oxygen; titrate to target SpO2 per local guidance." },
  { id: 859, level: "EMT", category: "Medical Emergencies", text: "A patient has sudden onset unilateral facial droop and arm drift. The MOST important additional check is:", options: ["Urine ketones", "Peak flow", "Blood glucose", "Rectal temperature", "Stool guaiac"], correctIndex: 2, explanation: "Hypoglycemia can mimic stroke; check glucose early." },
  { id: 860, level: "EMT", category: "Medical Emergencies", text: "A patient with suspected stroke should be transported to:", options: ["Closest urgent care", "Any clinic with x-ray", "Stroke-capable center when possible with pre-notification", "A psychiatric facility", "Home if symptoms improve"], correctIndex: 2, explanation: "Stroke care is time-sensitive; transport to stroke-capable facility and pre-notify." },
  { id: 861, level: "EMT", category: "Medical Emergencies", text: "A patient is having a generalized seizure. The EMT’s BEST action is:", options: ["Restrain the patient fully", "Place an object in the mouth", "Protect from injury and manage airway/secretions", "Give water by mouth", "Begin abdominal thrusts"], correctIndex: 2, explanation: "Do not restrain or place objects in mouth; protect, time the seizure, and maintain airway." },
  { id: 862, level: "EMT", category: "Medical Emergencies", text: "After a seizure stops, the patient is confused and sleepy. This period is called:", options: ["Syncope", "Auras", "Postictal state", "Hypovolemia", "Status epilepticus"], correctIndex: 2, explanation: "Postictal state is common after seizures—confusion and fatigue." },
  { id: 863, level: "EMT", category: "Medical Emergencies", text: "A patient has black tarry stool and dizziness. Most concerning issue is:", options: ["Upper GI bleed", "Asthma", "Stroke", "Allergic reaction", "COPD only"], correctIndex: 0, explanation: "Melena indicates upper GI bleeding; dizziness suggests hypovolemia/poor perfusion." },
  { id: 864, level: "EMT", category: "Medical Emergencies", text: "A patient with CHF is severely dyspneic with crackles and pink frothy sputum. Best oxygen approach is:", options: ["Room air", "Paper bag breathing", "High-concentration oxygen and consider CPAP if allowed", "Oral glucose", "No intervention until hospital"], correctIndex: 2, explanation: "Pulmonary edema needs oxygenation support; CPAP can improve gas exchange when appropriate." },
  { id: 865, level: "EMT", category: "Medical Emergencies", text: "A patient is weak, diaphoretic, and confused. They can swallow. BEST intervention is:", options: ["Aspirin", "Oral glucose", "Nitroglycerin", "Furosemide", "Albuterol"], correctIndex: 1, explanation: "Likely hypoglycemia; if able to swallow, give oral glucose per protocol." },
  { id: 866, level: "EMT", category: "Medical Emergencies", text: "A patient has severe asthma and can only speak 1–2 words. Your priority is:", options: ["Encourage coughing", "Delay care to obtain full history", "Assist with prescribed bronchodilator and provide oxygen/ventilation support as needed", "Give aspirin", "Have them lie flat"], correctIndex: 2, explanation: "Severe respiratory distress needs immediate support—bronchodilator assistance and ventilation if inadequate." },
  { id: 867, level: "EMT", category: "Medical Emergencies", text: "A patient with opioid overdose has slow breathing and cyanosis. Best first action is:", options: ["Naloxone before airway support", "Ventilate with BVM and oxygen", "Give oral glucose", "Give aspirin", "Induce vomiting"], correctIndex: 1, explanation: "Airway and ventilation come first; provide BVM ventilations, then naloxone per protocol." },
  { id: 868, level: "EMT", category: "Medical Emergencies", text: "A patient with suspected meningitis may present with:", options: ["Chest pain radiating to arm", "Flank pain only", "Fever, stiff neck, and altered mental status", "Hives and itching only", "Isolated ankle pain"], correctIndex: 2, explanation: "Fever + neck stiffness + AMS is concerning for meningitis—use PPE and transport." },
  { id: 869, level: "EMT", category: "Medical Emergencies", text: "A patient with severe allergic reaction has stridor. BEST immediate action is:", options: ["Give oral diphenhydramine only", "Assist with epinephrine if available and prepare for rapid transport", "Give nitroglycerin", "Give aspirin", "Apply CPAP first"], correctIndex: 1, explanation: "Stridor indicates upper airway edema—epinephrine is time-critical." },
  { id: 870, level: "EMT", category: "Medical Emergencies", text: "A patient is hyperventilating from anxiety. Your BEST approach is:", options: ["Have them breathe into a paper bag", "Ignore and transport non-emergent", "Coach slow breathing, reassure, and assess for medical causes", "Give naloxone", "Give aspirin"], correctIndex: 2, explanation: "Avoid paper bag; coach breathing and rule out serious causes (asthma, PE, DKA, ACS)." },
  { id: 871, level: "EMT", category: "Medical Emergencies", text: "A patient has severe abdominal pain and guarding. This suggests:", options: ["Normal finding", "Minor strain", "Peritoneal irritation", "Allergic rhinitis", "Heat cramps"], correctIndex: 2, explanation: "Guarding/rigidity suggests peritoneal irritation—possible surgical abdomen." },
  { id: 872, level: "EMT", category: "Medical Emergencies", text: "A patient has fever and low BP with altered mental status. Best general concern is:", options: ["Sepsis", "Stable migraine", "Localized sprain", "Simple dehydration only", "Allergic rash only"], correctIndex: 0, explanation: "Fever + hypotension + AMS is concerning for sepsis (distributive shock)." },
  { id: 873, level: "EMT", category: "Medical Emergencies", text: "A patient has severe hypothermia. Handling should be:", options: ["Rough to stimulate", "Encourage brisk exercise", "Gentle with prevention of further heat loss", "Cold water immersion", "Massage extremities aggressively"], correctIndex: 2, explanation: "Handle gently to avoid dysrhythmias; prevent heat loss and transport." },
  { id: 874, level: "EMT", category: "Medical Emergencies", text: "Heat stroke is characterized MOST by:", options: ["Cool clammy skin and shivering", "Normal mental status", "Hot skin and altered mental status", "Hives and itching only", "Slow pulse with normal temperature"], correctIndex: 2, explanation: "Heat stroke is life-threatening hyperthermia with altered mental status—cool and transport." },
  { id: 875, level: "EMT", category: "Medical Emergencies", text: "A patient has sudden severe shortness of breath and pleuritic chest pain after long travel. This suggests:", options: ["GERD", "Pulmonary embolism", "Appendicitis", "Cellulitis", "Otitis media"], correctIndex: 1, explanation: "Sudden dyspnea + pleuritic pain after immobility suggests PE." },
  { id: 876, level: "EMT", category: "Medical Emergencies", text: "A patient has severe epistaxis. BEST positioning is:", options: ["Head back", "Supine", "Lean forward and pinch nostrils", "Prone", "Trendelenburg"], correctIndex: 2, explanation: "Lean forward and pinch nostrils to reduce bleeding and prevent aspiration." },
  { id: 877, level: "EMT", category: "Medical Emergencies", text: "A patient with suspected MI has no contraindications. The BEST early medication is:", options: ["Chewable aspirin", "Ibuprofen", "Antibiotics", "Oral glucose", "Activated charcoal"], correctIndex: 0, explanation: "Aspirin reduces platelet aggregation in suspected ACS when not contraindicated." },
  { id: 878, level: "EMT", category: "Medical Emergencies", text: "A patient has altered mental status and you suspect hypoxia. The MOST useful immediate assessment is:", options: ["Blood pressure only", "ECG rhythm only", "Airway, breathing, and SpO2", "Pupil size only", "Temperature only"], correctIndex: 2, explanation: "Hypoxia can cause AMS—assess and correct airway/breathing/oxygenation early." },
  { id: 879, level: "EMT", category: "Medical Emergencies", text: "A patient with known asthma is wheezing and has a prescribed inhaler. You should:", options: ["Take it away to prevent overuse", "Assist with the inhaler per protocol", "Give aspirin instead", "Give nitroglycerin", "Give oral glucose"], correctIndex: 1, explanation: "Assisting with prescribed bronchodilator is appropriate for bronchospasm if allowed by protocol." },
  { id: 880, level: "EMT", category: "Medical Emergencies", text: "A patient suddenly cannot move one side of the body and has slurred speech. The MOST important question is:", options: ["What did you eat today?", "When were you last normal (last known well)?", "Do you smoke?", "Have you traveled?", "Do you have allergies?"], correctIndex: 1, explanation: "Stroke treatment eligibility depends on symptom onset/last known well time." },
  { id: 881, level: "EMT", category: "Medical Emergencies", text: "A patient has suspected overdose but is awake and refuses care. EMT should:", options: ["Leave immediately without documentation", "Force transport", "Assess capacity, explain risks, and document refusal per policy", "Give naloxone secretly", "Call media"], correctIndex: 2, explanation: "Refusal requires capacity; educate and document thoroughly." },
  { id: 882, level: "EMT", category: "Medical Emergencies", text: "A patient has chest pain and took sildenafil earlier today. Nitroglycerin is:", options: ["Indicated immediately", "Contraindicated; withhold and contact medical direction", "Always safe if BP is normal", "Given only by mouth", "Given only after albuterol"], correctIndex: 1, explanation: "PDE-5 inhibitors with nitrates can cause profound hypotension—avoid per protocol timeframe." },
  { id: 883, level: "EMT", category: "Respiratory & Cardiac", text: "A patient with suspected pulmonary edema is alert, has crackles, and severe dyspnea. BEST initial intervention (if allowed) is:", options: ["Nasal cannula at 2 L/min only", "Assist with MDI inhaler", "CPAP and oxygenation support with close monitoring", "Abdominal thrusts", "Oral glucose"], correctIndex: 2, explanation: "CPAP can improve oxygenation and reduce work of breathing in acute pulmonary edema when indicated and permitted by protocol." },
    // 3) Respiratory & Cardiac (EMT) — 884–913
  { id: 884, level: "EMT", category: "Respiratory & Cardiac", text: "For an adult in respiratory arrest with a pulse, appropriate ventilation rate is:", options: ["1 breath every 1 second", "1 breath every 2 seconds", "1 breath every 6 seconds", "1 breath every 10 seconds", "No ventilations if pulse present"], correctIndex: 2, explanation: "Ventilate about 10/min (1 breath every 6 seconds) and reassess pulse/breathing frequently." },
  { id: 885, level: "EMT", category: "Respiratory & Cardiac", text: "A patient is breathing 28/min with shallow breaths and poor chest rise. BEST initial management is:", options: ["Nasal cannula at 2 L/min", "Encourage slow breathing", "Assist ventilations with BVM and high-flow oxygen", "Give aspirin", "Place in Trendelenburg"], correctIndex: 2, explanation: "Inadequate tidal volume requires assisted ventilation; oxygen alone is not enough." },
  { id: 886, level: "EMT", category: "Respiratory & Cardiac", text: "A patient has chest pain. Which finding is a contraindication to assisting with nitroglycerin (general EMT concept)?", options: ["Pain radiates to jaw", "History of hypertension", "Systolic BP is low per protocol threshold", "Patient is nauseated", "Pain began at rest"], correctIndex: 2, explanation: "Nitro can cause hypotension—low systolic BP is a key contraindication per protocol." },
  { id: 887, level: "EMT", category: "Respiratory & Cardiac", text: "A patient with suspected ACS is allergic to aspirin (true anaphylaxis). EMT should:", options: ["Give aspirin anyway because it’s lifesaving", "Give ibuprofen instead", "Withhold aspirin and proceed with rapid transport/other care", "Delay transport until pain resolves", "Give oral glucose"], correctIndex: 2, explanation: "True aspirin allergy is a contraindication; focus on ABCs, monitoring, and rapid transport." },
  { id: 888, level: "EMT", category: "Respiratory & Cardiac", text: "A patient with asthma is wheezing but can speak full sentences and has normal mentation. Oxygen should be:", options: ["Withheld in all asthma", "NRB always", "Titrated based on SpO2 and work of breathing per protocol", "Given only after epinephrine", "Given only if cyanotic"], correctIndex: 2, explanation: "Provide oxygen based on oxygenation and distress; many asthmatics are not hypoxic early." },
  { id: 889, level: "EMT", category: "Respiratory & Cardiac", text: "A patient is in severe respiratory distress with frothy sputum and crackles. The MOST helpful noninvasive tool (if allowed) is:", options: ["Paper bag breathing", "Incentive spirometer", "CPAP", "Abdominal thrusts", "Oral glucose"], correctIndex: 2, explanation: "CPAP can improve oxygenation and reduce work of breathing in pulmonary edema when appropriate." },
  { id: 890, level: "EMT", category: "Respiratory & Cardiac", text: "A patient with COPD exacerbation is tiring and becoming confused. This suggests:", options: ["Improvement", "Mild anxiety only", "Impending respiratory failure", "Hyperglycemia only", "A stable condition"], correctIndex: 2, explanation: "Fatigue/AMS in COPD with distress is a late sign—prepare to ventilate and transport rapidly." },
  { id: 891, level: "EMT", category: "Respiratory & Cardiac", text: "Which finding MOST suggests CHF rather than asthma?", options: ["Wheezing only", "History of allergies", "Crackles with pedal edema and orthopnea", "Fever and productive cough", "Sharp pleuritic pain"], correctIndex: 2, explanation: "CHF often presents with crackles, edema, and orthopnea; asthma is primarily bronchospasm." },
  { id: 892, level: "EMT", category: "Respiratory & Cardiac", text: "A patient has suspected MI and is nauseated. They become lightheaded after standing. BEST action is:", options: ["Have them walk to ambulance to build strength", "Give more nitro immediately", "Place supine (if tolerated), reassess vitals, treat per protocol, transport", "Offer food and water", "Delay transport for restroom use"], correctIndex: 2, explanation: "Syncope/lightheadedness suggests perfusion issue—position supine, reassess, and transport." },
  { id: 893, level: "EMT", category: "Respiratory & Cardiac", text: "A patient is unresponsive with agonal gasps and no pulse. Next step is:", options: ["Check blood pressure", "Give rescue breaths only", "Start CPR and apply AED as soon as possible", "Give oral glucose", "Place in recovery position"], correctIndex: 2, explanation: "Agonal gasps are not normal breathing—begin CPR and use AED early." },
  { id: 894, level: "EMT", category: "Respiratory & Cardiac", text: "After delivering a shock with an AED, you should:", options: ["Check pulse immediately for 30 seconds", "Wait for the patient to wake up", "Resume CPR immediately for about 2 minutes (per guidelines) unless instructed otherwise", "Give oxygen only and stop compressions", "Remove pads to reassess rhythm"], correctIndex: 2, explanation: "Minimize interruptions: resume compressions immediately after shock." },
  { id: 895, level: "EMT", category: "Respiratory & Cardiac", text: "A patient has chest pain and shortness of breath. Lung sounds are clear, and SpO2 is low. A dangerous cause to consider is:", options: ["Seasonal allergies", "Simple bronchitis", "Pulmonary embolism", "Otitis media", "Food intolerance"], correctIndex: 2, explanation: "PE can cause dyspnea/hypoxia with clear lungs." },
  { id: 896, level: "EMT", category: "Respiratory & Cardiac", text: "In CPR, the MOST important reason to avoid long pauses is:", options: ["It saves battery life", "It improves oxygen saturation instantly", "Pauses reduce coronary/cerebral perfusion pressure", "It prevents rib fractures", "It reduces patient anxiety"], correctIndex: 2, explanation: "Continuous compressions maintain perfusion pressure; long pauses worsen outcomes." },
  { id: 897, level: "EMT", category: "Respiratory & Cardiac", text: "A patient has sudden onset severe dyspnea, hypotension, and distended neck veins after trauma. BEST EMT priority is:", options: ["Oral glucose", "Aspirin", "Support airway/ventilation and rapid transport (ALS intercept if available)", "Delay transport for long splinting", "Give fluids by mouth"], correctIndex: 2, explanation: "This suggests obstructive shock (tension pneumo/tamponade)—support ABCs and transport rapidly." },
  { id: 898, level: "EMT", category: "Respiratory & Cardiac", text: "A patient with suspected ACS refuses aspirin because they “hate pills,” but is competent. EMT should:", options: ["Force them to take it", "Hide it in water", "Explain benefits/risks, respect refusal, document, and continue care/transport", "Cancel transport", "Call media"], correctIndex: 2, explanation: "Competent patients may refuse; educate, document, and continue indicated care." },
  { id: 899, level: "EMT", category: "Respiratory & Cardiac", text: "A patient uses a metered-dose inhaler. The BEST technique is:", options: ["Spray repeatedly while inhaling fast", "Inhale quickly and shallow", "Exhale, seal lips, inhale slowly while actuating, then hold breath briefly", "Actuate into the air near the face", "Swallow the medication"], correctIndex: 2, explanation: "Slow deep inhalation with actuation and brief breath-hold improves deposition." },
  { id: 900, level: "EMT", category: "Respiratory & Cardiac", text: "A patient with respiratory distress becomes drowsy with decreasing respiratory rate. This indicates:", options: ["Improvement", "Low pain tolerance", "Respiratory failure", "Normal sleep", "Only dehydration"], correctIndex: 2, explanation: "Drowsiness with slowing respirations is a late, critical sign—prepare to ventilate." },
  { id: 901, level: "EMT", category: "Respiratory & Cardiac", text: "A patient has wheezing after using a new cleaning chemical. This MOST suggests:", options: ["Appendicitis", "Bronchospasm from inhalation irritant", "GI bleed", "Stroke", "DVT"], correctIndex: 1, explanation: "Inhaled irritants can trigger bronchospasm and respiratory distress." },
  { id: 902, level: "EMT", category: "Respiratory & Cardiac", text: "A patient with suspected MI has taken 3 prescribed nitroglycerin doses already. Pain persists. EMT should:", options: ["Give unlimited nitro", "Give a 4th dose immediately no matter what", "Reassess vitals (especially BP), follow protocol/medical direction, transport rapidly", "Stop monitoring because nitro failed", "Give oral glucose"], correctIndex: 2, explanation: "Further nitro depends on BP/contraindications and protocol; transport and reassess." },
  { id: 903, level: "EMT", category: "Respiratory & Cardiac", text: "A patient has severe chest pain with sudden tearing sensation to the back. A key concern is:", options: ["Stable angina only", "Aortic dissection", "Asthma", "Otitis externa", "Viral gastroenteritis"], correctIndex: 1, explanation: "Tearing chest/back pain is a red flag for aortic dissection—rapid transport and careful management." },
  { id: 904, level: "EMT", category: "Respiratory & Cardiac", text: "A patient with CHF is hypotensive and has crackles. Which intervention is MOST risky for EMT-level care?", options: ["Position of comfort", "Oxygen support", "Large rapid fluid bolus by mouth", "Rapid transport and monitoring", "Reassessment of vitals"], correctIndex: 2, explanation: "CHF patients may worsen with fluids; EMTs generally avoid giving large volumes orally and prioritize oxygen/transport." },
  { id: 905, level: "EMT", category: "Respiratory & Cardiac", text: "An adult choking patient becomes unresponsive. Next step is:", options: ["Abdominal thrusts while supine", "Back blows only", "Begin CPR and check mouth for visible object before ventilations", "Give water", "Place in recovery position only"], correctIndex: 2, explanation: "For unresponsive choking: CPR; each cycle you may look for a visible object and remove it if seen." },
  { id: 906, level: "EMT", category: "Respiratory & Cardiac", text: "A patient has mild asthma and asks for oxygen though SpO2 is 99%. Best response is:", options: ["Refuse and leave", "Give NRB at 15 L/min always", "Explain oxygen isn’t required if oxygenation is normal; treat bronchospasm and monitor", "Give aspirin", "Induce vomiting"], correctIndex: 2, explanation: "Treat the cause (bronchospasm/anxiety) and monitor; routine high-flow oxygen isn’t necessary with normal SpO2." },
  { id: 907, level: "EMT", category: "Respiratory & Cardiac", text: "A patient has cyanosis, can’t speak, and no air movement. BEST immediate action is:", options: ["Give sips of water", "Do a blind finger sweep", "Begin abdominal thrusts (conscious adult) or back slaps (infant) per age", "Wait for cough", "Apply oxygen by nasal cannula"], correctIndex: 2, explanation: "No air movement = severe obstruction—perform age-appropriate relief maneuvers immediately." },
  { id: 908, level: "EMT", category: "Respiratory & Cardiac", text: "A patient has chest pain and is hyperventilating. EMT should FIRST:", options: ["Assume anxiety and cancel transport", "Give paper bag", "Assess for serious causes (ACS/PE/asthma) while coaching breathing", "Give nitro without vitals", "Give oral glucose"], correctIndex: 2, explanation: "Hyperventilation can be anxiety or serious disease—assess and coach breathing." },
  { id: 909, level: "EMT", category: "Respiratory & Cardiac", text: "Which sign MOST suggests respiratory distress in a child?", options: ["Normal skin color and playful behavior", "RR 18 with calm behavior", "Nasal flaring and retractions", "Slow cap refill with no breathing issues", "Isolated rash"], correctIndex: 2, explanation: "Retractions and nasal flaring indicate increased work of breathing in children." },
  { id: 910, level: "EMT", category: "Respiratory & Cardiac", text: "A patient with suspected ACS has SpO2 98% and no distress. Oxygen should be:", options: ["High-flow NRB always", "Withheld only if older than 65", "Not routinely given; titrate if hypoxic or in distress per protocol", "Given only after aspirin", "Given only after nitro"], correctIndex: 2, explanation: "Routine oxygen is not necessary with normal oxygenation; titrate as needed." },
  { id: 911, level: "EMT", category: "Respiratory & Cardiac", text: "A patient’s breathing rate is normal but chest rise is minimal. This indicates:", options: ["Adequate ventilation", "Only anxiety", "Inadequate ventilation (low tidal volume)", "Normal variant", "Hyperglycemia"], correctIndex: 2, explanation: "Ventilation depends on depth and rate; minimal chest rise suggests inadequate tidal volume." },
  { id: 912, level: "EMT", category: "Respiratory & Cardiac", text: "After ROSC, the BEST general oxygen goal is:", options: ["SpO2 100% at all times with maximal oxygen", "No oxygen ever", "Maintain adequate oxygenation and avoid extremes per protocol (titrate)", "Only nasal cannula regardless of SpO2", "Hyperventilate to ETCO2 20"], correctIndex: 2, explanation: "Post-ROSC care includes maintaining appropriate oxygenation and ventilation (avoid hyperoxia/hypocapnia per guidance)." },
  { id: 913, level: "EMT", category: "Respiratory & Cardiac", text: "A patient has new onset irregular pulse and dizziness. EMT priority is:", options: ["Ignore if BP is normal", "Give aspirin for all palpitations", "Assess ABCs, obtain vitals, monitor, and transport for evaluation", "Give oral glucose only", "Delay transport for caffeine avoidance counseling"], correctIndex: 2, explanation: "New irregular pulse with symptoms requires assessment, monitoring, and transport." },

  // 4) OB/GYN & Neonatal (EMT) — 914–943
  { id: 914, level: "EMT", category: "OB/GYN & Neonatal", text: "During childbirth, the baby’s head delivers and the cord is around the neck. You should:", options: ["Pull hard on the cord to remove it", "Clamp and cut immediately in all cases", "Gently slip the cord over the head if possible", "Push the head back into the vagina", "Delay all actions until hospital"], correctIndex: 2, explanation: "If nuchal cord is present, gently slip it over the head; if too tight, clamp and cut per training/protocol." },
  { id: 915, level: "EMT", category: "OB/GYN & Neonatal", text: "A newborn has poor tone and is not breathing. The FIRST action is:", options: ["Chest compressions", "Give oral glucose", "Warm, dry, stimulate, and open airway/clear secretions as needed", "Administer naloxone", "Delay until 1 minute"], correctIndex: 2, explanation: "Initial neonatal resuscitation: warmth, drying, stimulation, airway positioning, then ventilation if needed." },
  { id: 916, level: "EMT", category: "OB/GYN & Neonatal", text: "A newborn’s heart rate is 70/min after effective ventilation. Next step per neonatal priorities is:", options: ["Stop and reassess later", "Give oxygen only", "Begin chest compressions coordinated with ventilation per protocol", "Give aspirin", "Transport without interventions"], correctIndex: 2, explanation: "If HR remains <60–100 depending on guideline threshold after ventilation, compressions may be needed (follow local neonatal protocol)." },
  { id: 917, level: "EMT", category: "OB/GYN & Neonatal", text: "A pregnant patient with heavy vaginal bleeding in late pregnancy should be treated as:", options: ["Minor issue if no pain", "Stable unless contractions", "Potential shock—rapid transport and supportive care", "A GI bleed", "An allergic reaction"], correctIndex: 2, explanation: "Late-pregnancy bleeding can be life-threatening (placenta previa/abruption); treat for shock and transport." },
  { id: 918, level: "EMT", category: "OB/GYN & Neonatal", text: "A prolapsed umbilical cord is seen. The BEST action is to:", options: ["Pull on the cord to reposition", "Clamp and cut immediately", "Place patient in knee-chest or Trendelenburg and relieve pressure on cord per training; rapid transport", "Have mother push harder", "Ignore and transport non-emergent"], correctIndex: 2, explanation: "Prolapsed cord is an emergency—reduce cord compression and transport rapidly." },
  { id: 919, level: "EMT", category: "OB/GYN & Neonatal", text: "The placenta delivers after birth. You should:", options: ["Pull it out quickly", "Cut it into pieces", "Inspect for completeness and transport it with the patient per policy", "Throw it away", "Delay transport until bleeding stops completely"], correctIndex: 2, explanation: "Do not pull; allow natural delivery, manage bleeding, and transport placenta for evaluation if required." },
  { id: 920, level: "EMT", category: "OB/GYN & Neonatal", text: "Postpartum hemorrhage is MOST suspected when:", options: ["Mother is thirsty", "Mild cramps occur", "Heavy vaginal bleeding with signs of shock", "Mother is crying", "Temperature is 98.6°F"], correctIndex: 2, explanation: "Heavy bleeding and shock signs indicate postpartum hemorrhage—treat shock and rapid transport." },
  { id: 921, level: "EMT", category: "OB/GYN & Neonatal", text: "A baby is born and has a strong cry and good tone. BEST immediate care is:", options: ["Separate from mother immediately", "Cool the baby to reduce fever", "Dry, keep warm, and place skin-to-skin with mother if stable", "Give oxygen routinely", "Give oral glucose"], correctIndex: 2, explanation: "A vigorous newborn needs warmth, drying, and routine care; skin-to-skin helps temperature and bonding." },
  { id: 922, level: "EMT", category: "OB/GYN & Neonatal", text: "A pregnant patient in the third trimester becomes hypotensive supine. BEST positioning is:", options: ["Supine with legs elevated", "Prone", "Left lateral tilt/position", "Sitting bolt upright only", "Trendelenburg only"], correctIndex: 2, explanation: "Left lateral positioning reduces vena cava compression and improves venous return." },
  { id: 923, level: "EMT", category: "OB/GYN & Neonatal", text: "A newborn is cyanotic with a heart rate 120 and gasping. BEST next step is:", options: ["Chest compressions", "Suction for 2 minutes regardless", "Provide effective ventilations with BVM (neonatal) and reassess", "Give naloxone", "Stop and transport only"], correctIndex: 2, explanation: "With HR >100 but inadequate breathing, ventilation is the key intervention." },
  { id: 924, level: "EMT", category: "OB/GYN & Neonatal", text: "In childbirth, delivery of the head is followed by failure of shoulders to deliver (turtle sign). This suggests:", options: ["Breech delivery", "Placenta previa", "Shoulder dystocia", "Ectopic pregnancy", "Normal delivery"], correctIndex: 2, explanation: "Shoulder dystocia requires immediate maneuvers per protocol and rapid transport if not resolved." },
  { id: 925, level: "EMT", category: "OB/GYN & Neonatal", text: "A breech presentation is when:", options: ["Head delivers first", "Cord delivers first", "Buttocks or feet deliver first", "Placenta delivers first", "Baby delivers sideways always"], correctIndex: 2, explanation: "Breech = buttocks/feet first; it increases risk and often requires rapid transport and careful support." },
  { id: 926, level: "EMT", category: "OB/GYN & Neonatal", text: "A pregnant patient has seizures and high blood pressure. This is concerning for:", options: ["Hyperglycemia", "Ectopic pregnancy", "Eclampsia", "Appendicitis", "Asthma"], correctIndex: 2, explanation: "Seizure in pregnancy with hypertension suggests eclampsia—high-risk OB emergency." },
  { id: 927, level: "EMT", category: "OB/GYN & Neonatal", text: "Best general management for suspected eclampsia at EMT level is:", options: ["Give aspirin", "Give oral glucose", "Protect airway, prevent injury during seizure, oxygen/ventilation as needed, rapid transport", "Give nitro", "Encourage walking"], correctIndex: 2, explanation: "Support ABCs, protect from injury, and transport rapidly; medication management is protocol-dependent." },
  { id: 928, level: "EMT", category: "OB/GYN & Neonatal", text: "A newborn’s temperature drops quickly because:", options: ["They sweat heavily", "They have thick fat layers", "They have high surface area-to-mass and limited thermoregulation", "They breathe slower", "They produce less CO2"], correctIndex: 2, explanation: "Newborns lose heat easily; preventing hypothermia is a priority." },
  { id: 929, level: "EMT", category: "OB/GYN & Neonatal", text: "When cutting the umbilical cord (if required), the correct method is:", options: ["One clamp only", "No clamps—tear it", "Clamp in two places and cut between clamps", "Clamp and cut immediately before the baby breathes", "Cut without gloves"], correctIndex: 2, explanation: "Use two clamps (or ties) and cut between them using sterile technique as trained." },
  { id: 930, level: "EMT", category: "OB/GYN & Neonatal", text: "A pregnant patient with abdominal trauma should be transported:", options: ["Only if pain is severe", "Only if bleeding present", "Promptly with monitoring due to risk to mother and fetus", "To urgent care", "After a meal and rest"], correctIndex: 2, explanation: "Trauma in pregnancy can cause hidden complications (abruption); transport and monitor." },
  { id: 931, level: "EMT", category: "OB/GYN & Neonatal", text: "A newborn has meconium-stained fluid and is NOT vigorous. EMT priority is:", options: ["Delay ventilation to suction deeply for 2 minutes", "Give oral glucose", "Support airway and ventilations per neonatal protocol and training", "Start compressions immediately", "Transport without intervention"], correctIndex: 2, explanation: "Follow neonatal resuscitation priorities—effective ventilation is critical; suction only as needed to clear airway." },
  { id: 932, level: "EMT", category: "OB/GYN & Neonatal", text: "Which finding suggests imminent delivery?", options: ["Contractions every 20 minutes", "Mild backache", "Crowning", "Nausea only", "Headache"], correctIndex: 2, explanation: "Crowning indicates delivery is imminent." },
  { id: 933, level: "EMT", category: "OB/GYN & Neonatal", text: "A postpartum patient is bleeding heavily. BEST immediate care includes:", options: ["Sit upright and walk", "Give aspirin", "Treat for shock: oxygen as needed, keep warm, rapid transport", "Offer large amounts of water", "Delay transport for paperwork"], correctIndex: 2, explanation: "Postpartum hemorrhage can be fatal—support perfusion and transport rapidly." },
  { id: 934, level: "EMT", category: "OB/GYN & Neonatal", text: "In normal delivery, after the head delivers, the next step is to:", options: ["Pull on the head to speed delivery", "Rotate the head forcefully", "Support the head, check for nuchal cord, and guide shoulders as they deliver", "Clamp cord immediately", "Stand back and wait"], correctIndex: 2, explanation: "Support and control delivery; check cord and assist gentle delivery of shoulders." },
  { id: 935, level: "EMT", category: "OB/GYN & Neonatal", text: "A newborn’s APGAR score is assessed at:", options: ["Only at 10 minutes", "Only at birth", "1 and 5 minutes after birth", "Every 30 seconds", "Only if cyanotic"], correctIndex: 2, explanation: "APGAR is typically measured at 1 and 5 minutes (and sometimes 10 if needed)." },
  { id: 936, level: "EMT", category: "OB/GYN & Neonatal", text: "A pregnant patient feels the urge to push. The FIRST EMT action is:", options: ["Tell her not to push", "Ask for insurance", "Prepare for delivery and assess for crowning", "Give oral glucose", "Drive rapidly without assessment"], correctIndex: 2, explanation: "Assess stage of labor and prepare for delivery if imminent." },
  { id: 937, level: "EMT", category: "OB/GYN & Neonatal", text: "A newborn has HR 140, good tone, but is centrally cyanotic. BEST next step is:", options: ["No action; normal finding", "Chest compressions", "Provide supplemental oxygen/ventilation support as needed per neonatal protocol and reassess", "Give naloxone", "Give aspirin"], correctIndex: 2, explanation: "Central cyanosis suggests hypoxemia—support oxygenation per neonatal protocol." },
  { id: 938, level: "EMT", category: "OB/GYN & Neonatal", text: "Which is a reason to transport rather than deliver on scene?", options: ["Contractions every 8 minutes", "First pregnancy", "No crowning and no urge to push", "Crowning present", "Visible head at perineum"], correctIndex: 2, explanation: "If delivery is not imminent (no crowning/urge), transport is often preferred when safe." },
  { id: 939, level: "EMT", category: "OB/GYN & Neonatal", text: "A patient with suspected ectopic pregnancy may present with:", options: ["Mild rash", "Ear pain", "Lower abdominal pain with vaginal bleeding and signs of shock", "Productive cough", "Ankle swelling only"], correctIndex: 2, explanation: "Ectopic pregnancy can rupture causing internal bleeding—high-risk emergency." },
  { id: 940, level: "EMT", category: "OB/GYN & Neonatal", text: "If a newborn requires ventilation, the preferred initial approach is:", options: ["Adult NRB mask", "Mouth-to-mouth only", "Neonatal BVM with appropriate size mask and gentle ventilations", "CPAP only", "No ventilations until hospital"], correctIndex: 2, explanation: "Use appropriately sized neonatal BVM and mask; gentle ventilations are key." },
  { id: 941, level: "EMT", category: "OB/GYN & Neonatal", text: "A pregnant patient with third-trimester bleeding should have a vaginal exam by EMTs:", options: ["Always", "Only if pain-free", "Never (EMT field care avoids vaginal exam)", "Only if contractions are present", "Only if crowning"], correctIndex: 2, explanation: "EMTs should not perform vaginal exams; manage ABCs and transport." },
  { id: 942, level: "EMT", category: "OB/GYN & Neonatal", text: "A newborn is born prematurely and is very small. The MOST important supportive measure is:", options: ["Give water by mouth", "Delay drying to avoid刺激", "Prevent heat loss (warmth, drying, covering) and transport", "Deep suction routinely", "Put on ice packs"], correctIndex: 2, explanation: "Premature infants lose heat rapidly; warmth is critical." },
  { id: 943, level: "EMT", category: "OB/GYN & Neonatal", text: "A postpartum patient has severe headache and high BP. This is concerning for:", options: ["Simple fatigue", "Allergic reaction", "Hypertensive disorder/preeclampsia complications", "Otitis media", "Kidney stone only"], correctIndex: 2, explanation: "Severe headache with hypertension in pregnancy/postpartum is a red flag—rapid transport and monitoring." },

  // 5) Pediatrics (EMT) — 944–973
  { id: 944, level: "EMT", category: "Pediatrics", text: "In infants, the correct pulse check site is typically:", options: ["Radial", "Carotid", "Brachial", "Pedal", "Temporal only"], correctIndex: 2, explanation: "In infants, brachial pulse is commonly used for assessment." },
  { id: 945, level: "EMT", category: "Pediatrics", text: "A child with stridor and drooling who sits leaning forward is concerning for:", options: ["Croup", "Asthma", "Epiglottitis or severe upper airway obstruction", "Bronchiolitis", "CHF"], correctIndex: 2, explanation: "Drooling and tripod positioning suggest serious upper airway obstruction—minimize agitation and transport." },
  { id: 946, level: "EMT", category: "Pediatrics", text: "For a child with suspected epiglottitis, the BEST EMT approach is:", options: ["Inspect throat with tongue depressor", "Force supine position", "Keep child calm, provide gentle oxygen, and transport rapidly", "Give oral fluids", "Perform abdominal thrusts"], correctIndex: 2, explanation: "Do not agitate or visualize throat; keep calm and transport with airway readiness." },
  { id: 947, level: "EMT", category: "Pediatrics", text: "A child has barking cough and stridor worse at night. Most likely condition is:", options: ["Asthma", "Croup", "Pneumothorax", "CHF", "MI"], correctIndex: 1, explanation: "Barking cough and stridor are classic for croup." },
  { id: 948, level: "EMT", category: "Pediatrics", text: "In pediatric respiratory distress, the MOST sensitive sign of impending failure is:", options: ["Wheezing getting louder", "Increasing agitation only", "Decreasing mental status and slowing respirations", "High fever only", "Mild tachycardia"], correctIndex: 2, explanation: "Fatigue/AMS with slowing breathing is a late, dangerous sign—prepare to ventilate." },
  { id: 949, level: "EMT", category: "Pediatrics", text: "A child has fever and a petechial rash with lethargy. This is concerning for:", options: ["Simple viral cold", "Meningococcal illness/sepsis", "Allergic hives", "Sprain", "Otitis externa"], correctIndex: 1, explanation: "Fever + petechiae + lethargy is high risk for severe infection—rapid transport and PPE." },
  { id: 950, level: "EMT", category: "Pediatrics", text: "A child is choking and cannot cough or speak. BEST intervention is:", options: ["Give water", "Do blind finger sweeps", "Provide abdominal thrusts (age-appropriate) until relieved or unresponsive", "Give oxygen by nasal cannula", "Wait for ALS"], correctIndex: 2, explanation: "Severe obstruction requires immediate age-appropriate relief maneuvers." },
  { id: 951, level: "EMT", category: "Pediatrics", text: "If an infant is choking and cannot breathe, the correct sequence is:", options: ["Abdominal thrusts only", "Chest compressions only", "Back slaps and chest thrusts", "Finger sweep regardless", "Give milk"], correctIndex: 2, explanation: "Infant choking: cycles of 5 back slaps and 5 chest thrusts." },
  { id: 952, level: "EMT", category: "Pediatrics", text: "A febrile child has a brief seizure and is now awake and improving. This MOST suggests:", options: ["Status epilepticus", "Febrile seizure", "Stroke", "Anaphylaxis", "DKA"], correctIndex: 1, explanation: "Simple febrile seizures are brief and followed by recovery; still evaluate and transport per policy." },
  { id: 953, level: "EMT", category: "Pediatrics", text: "A child with dehydration will most likely show:", options: ["Bounding pulse and wet mucosa", "Normal cap refill always", "Dry mucous membranes and delayed cap refill", "Bradycardia early", "No change in behavior"], correctIndex: 2, explanation: "Dehydration often causes dry mucosa, tachycardia, and delayed cap refill." },
  { id: 954, level: "EMT", category: "Pediatrics", text: "The BEST way to deliver oxygen to a frightened toddler is:", options: ["Force NRB tightly", "BVM immediately", "Blow-by oxygen and keep the child calm", "Put child supine and restrain", "No oxygen ever"], correctIndex: 2, explanation: "Blow-by oxygen minimizes agitation and may improve tolerance." },
  { id: 955, level: "EMT", category: "Pediatrics", text: "A child has nasal flaring, grunting, and retractions. This indicates:", options: ["Normal breathing", "Mild anxiety", "Significant respiratory distress", "Only fever", "Stable airway"], correctIndex: 2, explanation: "Flaring, grunting, and retractions are signs of significant distress." },
  { id: 956, level: "EMT", category: "Pediatrics", text: "A child with asthma becomes silent with no wheezing and is drowsy. This suggests:", options: ["Improvement", "Airway is clear", "Impending respiratory failure", "Only anxiety", "Normal sleep"], correctIndex: 2, explanation: "Silent chest with fatigue/AMS is critical—ventilatory support may be needed." },
  { id: 957, level: "EMT", category: "Pediatrics", text: "In pediatric shock, hypotension is:", options: ["An early sign", "Always present", "A late sign", "Not related to shock", "Only in allergic reactions"], correctIndex: 2, explanation: "Children compensate well; hypotension is a late and ominous sign." },
  { id: 958, level: "EMT", category: "Pediatrics", text: "A child has a bulging fontanelle and fever. This is concerning for:", options: ["Dehydration", "Meningitis/increased intracranial pressure", "Simple cold", "Ankle sprain", "GI bleed"], correctIndex: 1, explanation: "Bulging fontanelle with fever suggests serious CNS infection or elevated ICP." },
  { id: 959, level: "EMT", category: "Pediatrics", text: "A child with croup is in distress. The BEST general EMT strategy is:", options: ["Force supine position", "Agitate the child to “open airway”", "Keep calm, provide blow-by oxygen, and transport", "Give oral fluids immediately", "Provide aspirin"], correctIndex: 2, explanation: "Minimize agitation; calm environment and gentle oxygen help." },
  { id: 960, level: "EMT", category: "Pediatrics", text: "A child has severe diarrhea and is lethargic. The biggest risk is:", options: ["Hypertension", "Fluid loss leading to shock", "MI", "Aortic dissection", "Asthma"], correctIndex: 1, explanation: "Pediatric dehydration can progress quickly to shock." },
  { id: 961, level: "EMT", category: "Pediatrics", text: "A child has suspected anaphylaxis. The MOST important medication is:", options: ["Diphenhydramine only", "Albuterol only", "Epinephrine (if prescribed/available per protocol)", "Aspirin", "Furosemide"], correctIndex: 2, explanation: "Epinephrine is first-line for anaphylaxis, especially with airway/breathing/circulation compromise." },
  { id: 962, level: "EMT", category: "Pediatrics", text: "A child has suspected abuse. BEST EMS practice is to:", options: ["Accuse caregivers directly", "Ignore and transport quietly", "Document objectively and report per mandated policy", "Take photos for proof", "Refuse care"], correctIndex: 2, explanation: "Objective documentation and mandated reporting are required; avoid confrontation." },
  { id: 963, level: "EMT", category: "Pediatrics", text: "A child has a foreign body in one nostril. EMT should:", options: ["Forceps remove blindly", "Irrigate with water", "Do not attempt blind removal; manage airway if needed and transport/advise per protocol", "Make the child inhale sharply", "Push it deeper to stop bleeding"], correctIndex: 2, explanation: "Avoid pushing the object further; manage airway if compromised and follow protocol." },
  { id: 964, level: "EMT", category: "Pediatrics", text: "A child with bronchiolitis most commonly presents with:", options: ["Chest pain radiating to arm", "Wheezing/crackles with increased work of breathing in an infant", "Severe hypertension", "Unilateral leg swelling", "Tearing back pain"], correctIndex: 1, explanation: "Bronchiolitis affects infants and causes respiratory distress with wheeze/crackles." },
  { id: 965, level: "EMT", category: "Pediatrics", text: "Best way to assess perfusion in a child quickly is:", options: ["Adult carotid pulse only", "BP cuff only", "Mental status, skin signs, and cap refill/pulse quality", "Temperature only", "Pupils only"], correctIndex: 2, explanation: "Pediatric assessment triangle concepts: appearance, work of breathing, circulation to skin." },
  { id: 966, level: "EMT", category: "Pediatrics", text: "A child becomes pale and lethargic after swimming. Concern should include:", options: ["Only sunburn", "Hypothermia even in mild weather", "MI", "AAA", "Appendicitis only"], correctIndex: 1, explanation: "Children lose heat rapidly in water—consider hypothermia and treat accordingly." },
  { id: 967, level: "EMT", category: "Pediatrics", text: "A child has a fever and is stiff-necked with photophobia. BEST action is:", options: ["Give aspirin", "Delay transport for fluids", "Use PPE, manage ABCs, and transport promptly", "Encourage walking", "No transport if fever is low"], correctIndex: 2, explanation: "Possible meningitis—protect yourself and transport for definitive care." },
  { id: 968, level: "EMT", category: "Pediatrics", text: "A pediatric patient with severe respiratory distress becomes bradycardic. This usually indicates:", options: ["Improvement", "Late hypoxia and impending arrest", "Normal sleep response", "Only anxiety", "High blood sugar"], correctIndex: 1, explanation: "In children, bradycardia often results from hypoxia and is a pre-arrest sign." },
  { id: 969, level: "EMT", category: "Pediatrics", text: "A child is alert but has stridor only when upset and a barky cough. BEST care is:", options: ["Force throat exam", "Restrain for NRB", "Keep calm and provide blow-by oxygen as needed", "Give oral glucose", "Perform suction routinely"], correctIndex: 2, explanation: "Mild croup worsens with agitation—keep calm and support oxygenation." },
  { id: 970, level: "EMT", category: "Pediatrics", text: "A child has nausea/vomiting and is breathing rapidly with fruity breath. BEST additional check is:", options: ["Stool sample", "Blood pressure only", "Blood glucose", "Peak flow only", "Pupil size only"], correctIndex: 2, explanation: "Consider diabetes/DKA—check glucose and transport." },
  { id: 971, level: "EMT", category: "Pediatrics", text: "A child has suspected poisoning. EMT should bring to the hospital:", options: ["Only the child", "Nothing from scene", "Any suspected substance containers (if safe) and provide history", "Only a written note", "Food samples only"], correctIndex: 2, explanation: "Containers help identify toxin and guide treatment; ensure scene safety first." },
  { id: 972, level: "EMT", category: "Pediatrics", text: "A child with fever is dehydrated. Oral rehydration is appropriate when:", options: ["Child is unresponsive", "Child is vomiting continuously", "Child is alert and can protect airway/swallow", "Child has airway compromise", "Child is in shock"], correctIndex: 2, explanation: "Oral fluids are only appropriate if the child is alert and can swallow safely per protocol." },
  { id: 973, level: "EMT", category: "Pediatrics", text: "A child with suspected airway foreign body has sudden coughing and wheeze. BEST action is:", options: ["Give antibiotics", "Perform abdominal thrusts immediately even if coughing well", "If effective cough/air movement: encourage coughing and monitor; intervene if it becomes ineffective", "Blind finger sweep", "Give oral fluids"], correctIndex: 2, explanation: "Effective coughing = do not interfere; be ready if obstruction worsens." },

  // 6) Behavioral & Special Populations (EMT) — 974–1003
  { id: 974, level: "EMT", category: "Behavioral & Special Populations", text: "A patient is hallucinating, paranoid, and may be violent. BEST initial approach is:", options: ["Approach quickly and touch them", "Argue to prove hallucinations are false", "Use calm communication, maintain distance, and request law enforcement if needed", "Corner the patient to prevent escape", "Take away all belongings immediately"], correctIndex: 2, explanation: "Scene safety and de-escalation are priorities; involve law enforcement when safety is a concern." },
  { id: 975, level: "EMT", category: "Behavioral & Special Populations", text: "A patient expresses suicidal intent with a specific plan. Best action is:", options: ["Accept refusal immediately", "Leave them alone to calm down", "Ensure safety and transport for evaluation with appropriate support per policy", "Give aspirin", "Promise secrecy from all authorities"], correctIndex: 2, explanation: "High-risk suicidal ideation requires safety measures and transport/evaluation per policy." },
  { id: 976, level: "EMT", category: "Behavioral & Special Populations", text: "A patient is intoxicated but answers appropriately and understands risks. They refuse transport. EMT should:", options: ["Force transport because intoxication always means no capacity", "Ignore and leave with no documentation", "Assess capacity carefully, explain risks, and document refusal per policy", "Take their phone as collateral", "Call media"], correctIndex: 2, explanation: "Capacity is decision-specific; document assessment and refusal thoroughly." },
  { id: 977, level: "EMT", category: "Behavioral & Special Populations", text: "A patient is anxious and hyperventilating but also has chest pain and risk factors. EMT should:", options: ["Assume anxiety only", "Use paper bag", "Assess for medical causes (ACS/PE) while coaching breathing", "Give oral glucose only", "Cancel transport"], correctIndex: 2, explanation: "Rule out serious causes; anxiety can mimic or coexist with emergencies." },
  { id: 978, level: "EMT", category: "Behavioral & Special Populations", text: "A patient with dementia is confused and tries to leave. BEST approach is:", options: ["Yell commands repeatedly", "Restrain immediately without explanation", "Use calm redirection, involve caregivers, and ensure safety", "Ignore and let them wander", "Provide alcohol to calm them"], correctIndex: 2, explanation: "Use reassurance and redirection; prioritize safety and involve caregivers/medical direction if needed." },
  { id: 979, level: "EMT", category: "Behavioral & Special Populations", text: "A patient on anticoagulants falls and hits head, now feels “fine.” BEST decision is:", options: ["No transport needed", "Transport only if vomiting", "High index of suspicion: recommend evaluation/transport and monitor closely", "Give aspirin", "Have them sleep it off"], correctIndex: 2, explanation: "Anticoagulants increase risk of intracranial bleeding even with minor trauma." },
  { id: 980, level: "EMT", category: "Behavioral & Special Populations", text: "A bariatric patient needs movement. BEST injury prevention for crew is:", options: ["Lift quickly with back", "Use fewer people to avoid crowding", "Use proper equipment, enough personnel, and coordinated commands", "Drag by arms", "Refuse care"], correctIndex: 2, explanation: "Use appropriate lifting devices and team coordination to prevent provider injury." },
  { id: 981, level: "EMT", category: "Behavioral & Special Populations", text: "A patient with developmental disability is frightened. Best communication is:", options: ["Speak only to caregiver and ignore patient", "Use sarcasm to lighten mood", "Use simple calm language, allow time, and involve caregiver support", "Shout to ensure understanding", "Use medical jargon"], correctIndex: 2, explanation: "Clear, simple communication and caregiver support improves cooperation and reduces anxiety." },
  { id: 982, level: "EMT", category: "Behavioral & Special Populations", text: "A patient is suspected of being abused by partner at home. BEST EMS approach is:", options: ["Confront partner aggressively", "Ignore signs to avoid conflict", "Ensure patient safety/privacy, document objectively, and report per policy", "Post about it for awareness", "Refuse transport unless police arrive"], correctIndex: 2, explanation: "Protect patient, document objectively, and follow reporting/policy without escalating risk." },
  { id: 983, level: "EMT", category: "Behavioral & Special Populations", text: "A patient has a panic attack and is tingling in hands/mouth. This is most consistent with:", options: ["Hyperglycemia", "Hypoxia always", "Respiratory alkalosis from hyperventilation", "GI bleed", "Anaphylaxis"], correctIndex: 2, explanation: "Hyperventilation can cause alkalosis leading to tingling and carpopedal spasm." },
  { id: 984, level: "EMT", category: "Behavioral & Special Populations", text: "A combative patient is a danger to self/others. The FIRST priority is:", options: ["Diagnose psychiatric condition", "Give detailed history", "Scene safety and request assistance/resources", "Argue and threaten arrest", "Immediately apply restraints alone"], correctIndex: 2, explanation: "Ensure safety first; request law enforcement/ALS and use de-escalation." },
  { id: 985, level: "EMT", category: "Behavioral & Special Populations", text: "If restraints are used (per policy), the MOST important monitoring is:", options: ["Only BP once", "No monitoring needed", "Airway, breathing, circulation, and frequent reassessment/documentation", "Only comfort level", "Only pupil size"], correctIndex: 2, explanation: "Restrained patients can deteriorate; frequent ABC monitoring and documentation are critical." },
  { id: 986, level: "EMT", category: "Behavioral & Special Populations", text: "A patient has suspected excited delirium/violent agitation with hyperthermia risk. EMT priority is:", options: ["Long on-scene counseling", "Physical struggle alone", "Request ALS/law enforcement, minimize struggle, rapid transport, monitor airway/temperature", "Give oral fluids quickly", "Ignore sweating"], correctIndex: 2, explanation: "High-risk agitation needs rapid control/transport with safety measures and medical monitoring." },
  { id: 987, level: "EMT", category: "Behavioral & Special Populations", text: "A patient has autism and is sensitive to touch/noise. BEST strategy is:", options: ["Use siren in the room", "Touch without warning", "Reduce stimuli, explain steps, and use caregiver guidance", "Force eye contact", "Speak loudly and fast"], correctIndex: 2, explanation: "Lowering stimulation and clear explanations improve cooperation." },
  { id: 988, level: "EMT", category: "Behavioral & Special Populations", text: "A patient is hearing voices telling them to self-harm. BEST action is:", options: ["Assume they are joking", "Tell them to pray and leave", "Take seriously, ensure safety, and transport for evaluation per policy", "Give aspirin", "Refuse care"], correctIndex: 2, explanation: "Command hallucinations can be dangerous; treat as high risk and ensure safe evaluation." },
  { id: 989, level: "EMT", category: "Behavioral & Special Populations", text: "A patient refuses care but cannot explain risks/benefits and is disoriented. This indicates:", options: ["Valid refusal", "They just need more time", "Lack of decision-making capacity", "No problem if family agrees", "They are faking"], correctIndex: 2, explanation: "Capacity requires understanding/appreciation of consequences; disorientation suggests incapacity." },
  { id: 990, level: "EMT", category: "Behavioral & Special Populations", text: "A patient is elderly with UTI and confusion. This is:", options: ["Normal aging", "Always psychiatric", "A possible medical cause of altered mental status", "Proof of dementia", "Not an emergency"], correctIndex: 2, explanation: "In older adults, infections can cause delirium—treat as medical until proven otherwise." },
  { id: 991, level: "EMT", category: "Behavioral & Special Populations", text: "A patient has signs of stroke but also severe hypoglycemia. BEST action is:", options: ["Treat stroke first always", "Ignore glucose", "Correct hypoglycemia per protocol and reassess neurologic deficits", "Give aspirin", "Give nitro"], correctIndex: 2, explanation: "Hypoglycemia can mimic stroke; treat glucose then reassess." },
  { id: 992, level: "EMT", category: "Behavioral & Special Populations", text: "A patient is pregnant and feels faint when lying flat. BEST position is:", options: ["Supine", "Prone", "Left lateral tilt", "Trendelenburg only", "Sitting with legs dangling"], correctIndex: 2, explanation: "Left lateral tilt improves venous return by relieving vena cava compression." },
  { id: 993, level: "EMT", category: "Behavioral & Special Populations", text: "A patient has chronic oxygen use and becomes dyspneic. BEST initial step is:", options: ["Remove oxygen to avoid CO2 retention", "Assume anxiety", "Assess work of breathing and SpO2; titrate oxygen and support ventilation as needed", "Give aspirin", "Give oral glucose"], correctIndex: 2, explanation: "Treat the patient: assess and titrate oxygen/ventilation based on status and protocol." },
  { id: 994, level: "EMT", category: "Behavioral & Special Populations", text: "A patient with a tracheostomy is in distress. Oxygen should be delivered:", options: ["Only by nasal cannula", "Only by NRB on face", "Over the stoma with appropriate device", "By mouth-to-mouth", "Not possible"], correctIndex: 2, explanation: "Tracheostomy patients breathe through the stoma—oxygen/ventilation must be applied there." },
  { id: 995, level: "EMT", category: "Behavioral & Special Populations", text: "A patient is homeless and refuses transport. BEST practice is to:", options: ["Dismiss them as noncompliant", "Force transport for social reasons", "Assess capacity, offer resources/alternatives per policy, and document refusal", "Threaten arrest", "Refuse to treat"], correctIndex: 2, explanation: "Provide equitable care: capacity assessment, options, and thorough documentation." },
  { id: 996, level: "EMT", category: "Behavioral & Special Populations", text: "A patient has substance withdrawal with tremors and agitation. EMT priority is:", options: ["Give alcohol", "Ignore symptoms", "Assess ABCs, monitor, and transport; request ALS if severe", "Give aspirin", "Give nitro"], correctIndex: 2, explanation: "Withdrawal can be dangerous; monitor and transport for evaluation." },
  { id: 997, level: "EMT", category: "Behavioral & Special Populations", text: "A patient is in police custody and needs medical care. EMT should:", options: ["Refuse care because of custody", "Treat only if police request", "Provide appropriate medical care and protect patient privacy within limits", "Share full details with bystanders", "Delay treatment for handcuff removal always"], correctIndex: 2, explanation: "Duty to care remains; coordinate safety with law enforcement." },
  { id: 998, level: "EMT", category: "Behavioral & Special Populations", text: "A patient with suspected dementia is found wandering and cannot provide history. BEST next step is:", options: ["Leave them to find home", "Assume intoxication", "Assess, attempt to identify/contact caregiver, and transport if needed for safety/medical evaluation", "Give oral glucose automatically", "Refuse to transport"], correctIndex: 2, explanation: "Ensure safety and assess for medical causes; involve caregivers when possible." },
  { id: 999, level: "EMT", category: "Behavioral & Special Populations", text: "A patient becomes violent during care. BEST immediate action is:", options: ["Continue treatment ignoring violence", "Fight back", "Disengage, retreat to safety, and request assistance", "Handcuff the patient", "Sedate without orders"], correctIndex: 2, explanation: "Scene safety: disengage and call for help per policy." },
  { id: 1000, level: "EMT", category: "Behavioral & Special Populations", text: "A patient has a service animal. EMS should:", options: ["Separate them always", "Refuse transport", "Accommodate when possible and safe; coordinate transport arrangements per policy", "Remove animal by force", "Ignore it completely"], correctIndex: 2, explanation: "Service animals are often medically necessary; accommodate safely per policy." },
  { id: 1001, level: "EMT", category: "Behavioral & Special Populations", text: "A patient with limited English needs care. BEST approach is:", options: ["Speak louder in English", "Use family for all translation always", "Use interpreter resources when available and use simple communication", "Avoid asking questions", "Refuse service"], correctIndex: 2, explanation: "Accurate communication is part of care; use interpreter resources and simple phrases." },
  { id: 1002, level: "EMT", category: "Behavioral & Special Populations", text: "A patient has signs of hypoperfusion but insists they are fine. BEST EMT action is:", options: ["Accept refusal immediately", "Argue until they comply", "Explain findings/risks, reassess capacity, involve medical control as needed, document", "Leave without documentation", "Give aspirin and leave"], correctIndex: 2, explanation: "Education, capacity assessment, and documentation are key—shock can impair judgment." },
  { id: 1003, level: "EMT", category: "Behavioral & Special Populations", text: "A patient is a minor and parents are not present. Treatment decisions should follow:", options: ["Only the minor’s wishes always", "No treatment ever", "Local consent laws/protocols (implied consent for emergencies, emancipated minor rules, etc.)", "Only police orders", "Only school staff"], correctIndex: 2, explanation: "Consent rules vary; emergencies allow implied consent, and some minors can consent depending on law." },

  // 7) EMS Ops & Incident Management (EMT) — 1004–1033
  { id: 1004, level: "EMT", category: "EMS Operations", text: "In START triage, a patient who cannot walk, has RR 36, and has a pulse is tagged:", options: ["Green", "Yellow", "Red", "Black", "Blue"], correctIndex: 2, explanation: "START: RR >30 is immediate (Red) if not walking." },
  { id: 1005, level: "EMT", category: "EMS Operations", text: "In START triage, an apneic patient who begins breathing after airway repositioning is tagged:", options: ["Green", "Yellow", "Red", "Black", "White"], correctIndex: 2, explanation: "START: If breathing resumes after opening airway, tag Red (Immediate)." },
  { id: 1006, level: "EMT", category: "EMS Operations", text: "In START triage, an apneic patient who does NOT begin breathing after airway repositioning is tagged:", options: ["Green", "Yellow", "Red", "Black", "Blue"], correctIndex: 3, explanation: "START: Not breathing after airway repositioning is expectant/deceased (Black) in MCI triage." },
  { id: 1007, level: "EMT", category: "EMS Operations", text: "In START triage, a patient has RR 20, cap refill 3 seconds, and follows commands. Tag is:", options: ["Green", "Yellow", "Red", "Black", "Orange"], correctIndex: 2, explanation: "START: Cap refill >2 sec indicates poor perfusion → Red." },
  { id: 1008, level: "EMT", category: "EMS Operations", text: "In START triage, a patient has RR 20, radial pulse present, but cannot follow commands. Tag is:", options: ["Green", "Yellow", "Red", "Black", "Gray"], correctIndex: 2, explanation: "START: Unable to follow commands = Red." },
  { id: 1009, level: "EMT", category: "EMS Operations", text: "A primary goal of ICS at an MCI is:", options: ["To treat every patient fully on scene", "To avoid radio use", "To organize resources and communication efficiently", "To transport only minor injuries first", "To eliminate documentation"], correctIndex: 2, explanation: "ICS provides structure for command, coordination, and resource management." },
  { id: 1010, level: "EMT", category: "EMS Operations", text: "The BEST ambulance parking position at a highway incident is generally:", options: ["Upstream of scene with no lights", "On a blind curve for faster exit", "Downstream blocking to protect the work area per policy", "In the median facing traffic", "Directly next to leaking fuel"], correctIndex: 2, explanation: "Block/protect the scene and responders; follow agency policy for safe positioning." },
  { id: 1011, level: "EMT", category: "EMS Operations", text: "If you suspect a HazMat release, you should stage:", options: ["Downwind and downhill", "Inside the hot zone", "Upwind, uphill, and upstream", "Next to the container", "In a closed garage"], correctIndex: 2, explanation: "Upwind/uphill/upstream reduces exposure risk." },
  { id: 1012, level: "EMT", category: "EMS Operations", text: "The MOST appropriate action at a suspected crime scene is:", options: ["Collect evidence", "Move objects to search for evidence", "Provide care while preserving evidence as much as possible", "Take photos for your report", "Refuse care until detectives arrive"], correctIndex: 2, explanation: "Patient care comes first, but preserve evidence and limit disturbance when possible." },
  { id: 1013, level: "EMT", category: "EMS Operations", text: "To reduce cross-contamination after a call with bodily fluids, EMTs should:", options: ["Remove gloves last after touching everything", "Skip hand hygiene if gloves were worn", "Perform proper doffing, hand hygiene, and disinfect equipment per policy", "Use the same linens for next patient", "Only wipe the stretcher quickly"], correctIndex: 2, explanation: "Proper PPE removal and disinfection prevent transmission." },
  { id: 1014, level: "EMT", category: "EMS Operations", text: "If a patient refuses care, the MOST important documentation includes:", options: ["Only patient signature", "Only EMT opinion", "Capacity assessment, risks explained, patient statements, vitals, and witnesses per policy", "No vitals to avoid liability", "Only dispatch time"], correctIndex: 2, explanation: "Refusal documentation must show informed decision-making and your assessment." },
  { id: 1015, level: "EMT", category: "EMS Operations", text: "An EMT begins care and then leaves before transfer to equal/higher care without refusal. This is:", options: ["Consent", "Negligence always", "Abandonment", "Scope expansion", "Quality improvement"], correctIndex: 2, explanation: "Leaving after initiating care without proper handoff/refusal is abandonment." },
  { id: 1016, level: "EMT", category: "EMS Operations", text: "The BEST description of “implied consent” is:", options: ["Any patient agrees automatically", "Only written consent", "Permission assumed when patient is unable to consent and care is needed for life threats", "Consent from bystanders", "Consent only for minors"], correctIndex: 2, explanation: "Unconscious or incapacitated patients are treated under implied consent in emergencies." },
  { id: 1017, level: "EMT", category: "EMS Operations", text: "When lifting a stretcher, the safest practice is:", options: ["Lift with your back to keep legs fresh", "Twist while lifting", "Use legs, keep load close, coordinate commands, and use enough personnel", "Lift alone to be faster", "Lock knees straight"], correctIndex: 2, explanation: "Body mechanics and team coordination reduce injuries." },
  { id: 1018, level: "EMT", category: "EMS Operations", text: "A patient’s medical information can be shared with receiving hospital staff because it is for:", options: ["Entertainment", "Treatment and operations", "Social media awareness", "Family gossip", "Public curiosity"], correctIndex: 1, explanation: "Sharing for treatment/operations is allowed; avoid unnecessary disclosures." },
  { id: 1019, level: "EMT", category: "EMS Operations", text: "A DNR generally means:", options: ["No transport", "No oxygen", "No resuscitation efforts like CPR/defib (comfort care may still be provided)", "No pain control", "No assessment"], correctIndex: 2, explanation: "DNR limits resuscitation; other supportive care may still be appropriate per policy." },
  { id: 1020, level: "EMT", category: "EMS Operations", text: "If a provider has a needle-stick injury, the FIRST action is:", options: ["Finish call first", "Ignore if gloves worn", "Wash/flush area immediately and report per exposure protocol", "Self-prescribe antibiotics", "Hide it to avoid paperwork"], correctIndex: 2, explanation: "Immediate cleansing and prompt reporting are required for exposure management." },
  { id: 1021, level: "EMT", category: "EMS Operations", text: "During radio report, the MOST useful elements are:", options: ["Patient’s full name and address", "A long story of everything said", "Age/sex, chief complaint, key findings, vitals, treatment, ETA", "Your diagnosis certainty", "Insurance details"], correctIndex: 2, explanation: "Concise structured reports support continuity and privacy." },
  { id: 1022, level: "EMT", category: "EMS Operations", text: "If a bystander is recording, EMTs should:", options: ["Take the phone", "Stop care", "Continue professional care and protect privacy per policy", "Argue and threaten", "Share diagnosis to educate them"], correctIndex: 2, explanation: "Remain professional; focus on patient care and privacy." },
  { id: 1023, level: "EMT", category: "EMS Operations", text: "The BEST reason to clean the ambulance after each patient is:", options: ["To pass inspections only", "To look nice", "To prevent disease transmission", "To reduce fuel use", "To increase speed"], correctIndex: 2, explanation: "Disinfection prevents cross-contamination and infection spread." },
  { id: 1024, level: "EMT", category: "EMS Operations", text: "A patient’s valuables should be:", options: ["Left behind always", "Taken by EMT with no record", "Secured, documented, and transferred per policy", "Given to random bystander", "Thrown away"], correctIndex: 2, explanation: "Document and secure belongings to avoid loss and maintain accountability." },
  { id: 1025, level: "EMT", category: "EMS Operations", text: "In ICS, the person responsible for overall scene management is:", options: ["Safety officer", "Triage officer", "Incident Commander", "Public information officer", "Transport officer"], correctIndex: 2, explanation: "The Incident Commander has overall responsibility and assigns roles." },
  { id: 1026, level: "EMT", category: "EMS Operations", text: "In triage, the term “walking wounded” generally corresponds to:", options: ["Red", "Yellow", "Green", "Black", "Blue"], correctIndex: 2, explanation: "Green patients can walk and have minor injuries in START triage." },
  { id: 1027, level: "EMT", category: "EMS Operations", text: "If you arrive first at a bus crash with many victims, your FIRST operational step is:", options: ["Load first patient and leave", "Start IVs", "Establish command/request resources and begin triage", "Wait for media", "Ask for patient IDs"], correctIndex: 2, explanation: "Early command and resource requests are critical to manage MCIs." },
  { id: 1028, level: "EMT", category: "EMS Operations", text: "A contaminated patient from HazMat should be:", options: ["Placed immediately in ambulance", "Treated inside the hot zone", "Decontaminated per HazMat direction before transport when possible", "Given water to drink and released", "Ignored if stable"], correctIndex: 2, explanation: "Prevent contaminating rescuers and ambulance; decon per protocol/command." },
  { id: 1029, level: "EMT", category: "EMS Operations", text: "The MOST appropriate place for EMS staging in a potentially violent scene is:", options: ["Inside the scene for faster access", "Next to the suspect", "A safe location until law enforcement secures the scene", "In the middle of the street", "Any place with best cell service"], correctIndex: 2, explanation: "Do not enter unsafe scenes; stage until secured." },
  { id: 1030, level: "EMT", category: "EMS Operations", text: "If an error is found on a paper PCR, the correct fix is usually:", options: ["Erase it fully", "Use white-out", "Single line through error, initial/date, and addendum if needed per policy", "Throw it away", "Rewrite with different times"], correctIndex: 2, explanation: "Maintain integrity of record; correct per approved method." },
  { id: 1031, level: "EMT", category: "EMS Operations", text: "A patient is a minor and needs emergency care; no guardian is present. EMTs should:", options: ["Do nothing until parent arrives", "Transport only if police approve", "Provide emergency care under implied consent and follow local protocol", "Refuse care due to liability", "Ask bystanders to sign consent"], correctIndex: 2, explanation: "Emergent threats allow implied consent for minors when guardians unavailable." },
  { id: 1032, level: "EMT", category: "EMS Operations", text: "The BEST way to avoid fatigue-related driving risk is:", options: ["Drive faster to finish shift", "Skip seat belts", "Follow agency policy: rest breaks, partner monitoring, and safe driving practices", "Use sirens continuously", "Ignore signs of fatigue"], correctIndex: 2, explanation: "Fatigue increases crash risk; follow safety policy and drive with due regard." },
  { id: 1033, level: "EMT", category: "EMS Operations", text: "When transporting with lights and sirens, EMTs must:", options: ["Ignore all traffic laws", "Assume everyone yields", "Drive with due regard and follow laws/policy", "Never stop at intersections", "Turn off headlights at night"], correctIndex: 2, explanation: "Emergency response does not remove responsibility for safe operation." },

  // ================= PARAMEDIC CATEGORIES =================

  // 1) Pharmacology (Paramedic) — 1034–1063
  { id: 1034, level: "Paramedic", category: "Pharmacology", text: "Epinephrine in anaphylaxis works primarily by:", options: ["Blocking platelets", "Causing bronchoconstriction", "Alpha/beta effects: vasoconstriction, bronchodilation, and reduced mucosal edema", "Lowering glucose", "Causing diuresis"], correctIndex: 2, explanation: "Epi treats anaphylaxis by improving BP, bronchodilating, and reducing airway edema." },
  { id: 1035, level: "Paramedic", category: "Pharmacology", text: "Naloxone’s primary purpose is to:", options: ["Sedate agitated patients", "Treat hypoglycemia", "Reverse opioid-induced respiratory depression", "Treat bronchospasm", "Lower blood pressure"], correctIndex: 2, explanation: "Naloxone antagonizes opioid receptors and can restore ventilation in opioid toxicity." },
  { id: 1036, level: "Paramedic", category: "Pharmacology", text: "Adenosine is MOST appropriate for:", options: ["Irregular wide-complex tachycardia", "Asystole", "Stable regular narrow-complex SVT", "VF arrest", "Sinus tachycardia from fever"], correctIndex: 2, explanation: "Adenosine treats stable regular SVT by transient AV nodal blockade." },
  { id: 1037, level: "Paramedic", category: "Pharmacology", text: "Adenosine should be given:", options: ["As a slow IV infusion", "IM only", "Rapid IV push with immediate flush", "Orally", "Through a filter over 10 minutes"], correctIndex: 2, explanation: "Very short half-life requires rapid IV push and flush." },
  { id: 1038, level: "Paramedic", category: "Pharmacology", text: "Atropine in bradycardia works by:", options: ["Stimulating beta receptors", "Blocking alpha receptors", "Blocking vagal (parasympathetic) effects on the SA/AV node", "Increasing potassium shift", "Lowering calcium"], correctIndex: 2, explanation: "Atropine is an anticholinergic that reduces parasympathetic tone, increasing heart rate." },
  { id: 1039, level: "Paramedic", category: "Pharmacology", text: "Amiodarone in refractory VF/pVT is used to:", options: ["Increase platelet aggregation", "Cause bronchoconstriction", "Stabilize cardiac membranes and suppress ventricular arrhythmias", "Treat hypoglycemia", "Reverse opioids"], correctIndex: 2, explanation: "Amiodarone is an antiarrhythmic used for shock-refractory VF/pVT per protocol." },
  { id: 1040, level: "Paramedic", category: "Pharmacology", text: "Magnesium sulfate is the drug of choice for:", options: ["Sinus bradycardia", "PEA", "Torsades de pointes", "Asystole", "Stable angina"], correctIndex: 2, explanation: "Magnesium treats torsades (polymorphic VT with prolonged QT) and certain asthma protocols." },
  { id: 1041, level: "Paramedic", category: "Pharmacology", text: "Calcium administration is MOST indicated in:", options: ["Hypernatremia", "Septic shock", "Severe hyperkalemia with ECG changes", "Opioid overdose", "DVT"], correctIndex: 2, explanation: "Calcium stabilizes cardiac membrane in hyperkalemia with dangerous ECG changes." },
  { id: 1042, level: "Paramedic", category: "Pharmacology", text: "Nitroglycerin primarily causes:", options: ["Bronchodilation", "Increased clotting", "Vasodilation (especially venodilation) reducing preload and myocardial oxygen demand", "Increased heart rate by vagal blockade", "Diuresis only"], correctIndex: 2, explanation: "Nitro reduces preload and can relieve ischemic chest pain when BP allows and no contraindications." },
  { id: 1043, level: "Paramedic", category: "Pharmacology", text: "Nitroglycerin is contraindicated in suspected right ventricular infarct because it may:", options: ["Increase preload dangerously", "Cause bronchospasm", "Drop preload and worsen hypotension", "Raise glucose", "Cause seizures"], correctIndex: 2, explanation: "RV infarcts are preload-dependent; nitrates can cause severe hypotension." },
  { id: 1044, level: "Paramedic", category: "Pharmacology", text: "Albuterol works by:", options: ["Blocking histamine receptors", "Alpha-1 vasoconstriction", "Beta-2 agonism causing bronchodilation", "AV nodal blockade", "Increasing platelet function"], correctIndex: 2, explanation: "Albuterol is a beta-2 agonist that relaxes bronchial smooth muscle." },
  { id: 1045, level: "Paramedic", category: "Pharmacology", text: "A key side effect of albuterol is:", options: ["Bradycardia", "Hypothermia", "Tachycardia and tremor", "Severe sedation", "Miosis"], correctIndex: 2, explanation: "Beta-agonists commonly cause tachycardia, tremor, and anxiety." },
  { id: 1046, level: "Paramedic", category: "Pharmacology", text: "Dextrose administration is indicated for:", options: ["Hyperventilation", "CHF", "Confirmed/suspected hypoglycemia with symptoms", "Stable angina", "Tension pneumothorax"], correctIndex: 2, explanation: "Treat low blood sugar promptly when symptomatic or altered." },
  { id: 1047, level: "Paramedic", category: "Pharmacology", text: "Glucagon is useful when hypoglycemia is present and:", options: ["IV access is readily available", "Patient is actively vomiting", "IV access is not available and patient cannot safely take oral glucose", "Patient has normal glucose", "Patient is hypertensive"], correctIndex: 2, explanation: "Glucagon can raise glucose without IV access; effectiveness depends on glycogen stores." },
  { id: 1048, level: "Paramedic", category: "Pharmacology", text: "Aspirin benefits suspected ACS by:", options: ["Bronchodilation", "Vasoconstriction", "Inhibiting platelet aggregation", "Raising blood sugar", "Stopping seizures"], correctIndex: 2, explanation: "Aspirin reduces platelet aggregation, slowing clot progression." },
  { id: 1049, level: "Paramedic", category: "Pharmacology", text: "Morphine/fentanyl in ACS should be used cautiously because it may:", options: ["Increase BP significantly", "Cause bronchospasm always", "Cause hypotension/respiratory depression and mask symptoms", "Reverse opioid overdose", "Treat ventricular fibrillation"], correctIndex: 2, explanation: "Opioids can worsen hypotension and depress respiration; follow protocol and monitor." },
  { id: 1050, level: "Paramedic", category: "Pharmacology", text: "A patient is hypotensive in septic shock after fluids. A common next medication class is:", options: ["Diuretics", "Beta blockers", "Vasopressors (e.g., norepinephrine) per protocol", "Calcium channel blockers", "Antacids"], correctIndex: 2, explanation: "Distributive shock may require vasopressors after adequate volume resuscitation." },
  { id: 1051, level: "Paramedic", category: "Pharmacology", text: "Epinephrine in cardiac arrest is used primarily for:", options: ["Pain relief", "Sedation", "Vasoconstriction to improve coronary/cerebral perfusion pressure", "Bronchospasm only", "Diuresis"], correctIndex: 2, explanation: "Alpha-adrenergic vasoconstriction supports perfusion during CPR." },
  { id: 1052, level: "Paramedic", category: "Pharmacology", text: "Ketamine is often preferred for some agitated patients because it:", options: ["Always lowers BP drastically", "Has no airway effects", "Can provide rapid sedation while often preserving airway reflexes (still monitor)", "Causes immediate apnea in all cases", "Treats hypoglycemia"], correctIndex: 2, explanation: "Ketamine can be effective for excited delirium/agitation (protocol-dependent) but requires close airway monitoring." },
  { id: 1053, level: "Paramedic", category: "Pharmacology", text: "Midazolam is classified as a:", options: ["Opioid", "Antiplatelet", "Benzodiazepine", "Beta blocker", "Anticholinergic"], correctIndex: 2, explanation: "Midazolam is a benzodiazepine used for seizures, sedation, and anxiety per protocol." },
  { id: 1054, level: "Paramedic", category: "Pharmacology", text: "Benzodiazepines treat seizures primarily by:", options: ["Blocking sodium channels", "Increasing acetylcholine", "Enhancing GABA inhibitory activity", "Blocking beta receptors", "Increasing potassium"], correctIndex: 2, explanation: "Benzos enhance GABA, reducing neuronal excitability." },
  { id: 1055, level: "Paramedic", category: "Pharmacology", text: "Ondansetron is primarily used for:", options: ["Bronchodilation", "Pain control", "Nausea/vomiting", "Bradycardia", "Hyperkalemia"], correctIndex: 2, explanation: "Ondansetron is an antiemetic used to reduce nausea/vomiting." },
  { id: 1056, level: "Paramedic", category: "Pharmacology", text: "Furosemide in acute pulmonary edema is controversial prehospital because:", options: ["It instantly cures edema", "It always raises BP", "It may worsen dehydration/hypotension and isn’t always the primary problem", "It reverses asthma", "It stops VF"], correctIndex: 2, explanation: "Not all dyspnea is fluid overload; diuretics can worsen hypotension or renal issues—follow protocol." },
  { id: 1057, level: "Paramedic", category: "Pharmacology", text: "For severe asthma not responding to beta-agonists, a common additional medication (protocol-dependent) is:", options: ["Aspirin", "Nitroglycerin", "Epinephrine (IM) in severe bronchospasm/anaphylaxis context", "Furosemide", "Adenosine"], correctIndex: 2, explanation: "Epinephrine may be indicated in severe bronchospasm or anaphylaxis per protocol." },
  { id: 1058, level: "Paramedic", category: "Pharmacology", text: "Activated charcoal is generally most useful when:", options: ["In caustic ingestions", "Patient is unresponsive without airway control", "Certain oral poison ingestions within an appropriate timeframe and protected airway (per protocol)", "In alcohol intoxication", "In hydrocarbon aspiration risk"], correctIndex: 2, explanation: "Charcoal is poison-specific and requires airway protection; follow medical direction/protocol." },
  { id: 1059, level: "Paramedic", category: "Pharmacology", text: "In opioid overdose, a key risk of naloxone is:", options: ["Immediate kidney failure", "Severe hyperglycemia", "Acute withdrawal/agitation and vomiting with aspiration risk", "Permanent bradycardia", "Instant stroke"], correctIndex: 2, explanation: "Titrate naloxone to adequate ventilation; rapid reversal can cause agitation/vomiting." },
  { id: 1060, level: "Paramedic", category: "Pharmacology", text: "Sodium bicarbonate is classically indicated (protocol-dependent) for:", options: ["Anaphylaxis", "Asthma", "TCA overdose with wide QRS/metabolic acidosis scenarios", "Stable SVT", "Hypoglycemia"], correctIndex: 2, explanation: "Bicarb is used in TCA toxicity (QRS widening) and certain severe acidosis/hyperkalemia contexts per protocol." },
  { id: 1061, level: "Paramedic", category: "Pharmacology", text: "Diltiazem is primarily used for:", options: ["VF arrest", "Asystole", "Rate control in certain supraventricular tachyarrhythmias (e.g., AF with RVR) when stable", "Hyperkalemia", "Anaphylaxis"], correctIndex: 2, explanation: "Calcium channel blockers can slow AV node conduction for rate control when appropriate and permitted." },
  { id: 1062, level: "Paramedic", category: "Pharmacology", text: "Atropine is NOT effective in which bradycardia mechanism?", options: ["Vagal bradycardia", "Sinus bradycardia from meds", "High-degree AV block with infranodal block (often less responsive)", "Mild bradycardia with hypotension", "Symptomatic bradycardia with dizziness"], correctIndex: 2, explanation: "Infranodal high-grade blocks often respond poorly to atropine—pacing may be needed." },
  { id: 1063, level: "Paramedic", category: "Pharmacology", text: "A key safety step after giving any medication is:", options: ["Stop monitoring", "Turn off alarms", "Reassess vitals and patient response (effect/side effects) and document time/dose", "Avoid documenting to save time", "Assume it worked"], correctIndex: 2, explanation: "Medication administration requires reassessment and documentation to ensure effectiveness and detect adverse effects." },

  // 2) ECG/Arrhythmias & Resuscitation (Paramedic) — 1064–1093
  { id: 1064, level: "Paramedic", category: "ECG/Resuscitation", text: "A narrow-complex tachycardia that is irregularly irregular is most consistent with:", options: ["SVT", "Atrial fibrillation", "Ventricular tachycardia", "Asystole", "Sinus bradycardia"], correctIndex: 1, explanation: "Irregularly irregular rhythm is classic for atrial fibrillation." },
  { id: 1065, level: "Paramedic", category: "ECG/Resuscitation", text: "A wide-complex tachycardia with a pulse and hypotension should be treated with:", options: ["Vagal maneuvers", "Adenosine always", "Synchronized cardioversion", "No treatment", "Oral fluids"], correctIndex: 2, explanation: "Unstable tachycardia with a pulse requires synchronized cardioversion." },
  { id: 1066, level: "Paramedic", category: "ECG/Resuscitation", text: "Polymorphic VT that is unstable and cannot synchronize is treated as:", options: ["A stable rhythm", "Synchronized cardioversion always", "Defibrillation (unsynchronized)", "Atropine first", "Vagal maneuvers"], correctIndex: 2, explanation: "If synchronization is not possible, treat unstable polymorphic VT like VF with defibrillation." },
  { id: 1067, level: "Paramedic", category: "ECG/Resuscitation", text: "PEA management includes:", options: ["Immediate defibrillation", "Cardioversion and adenosine", "High-quality CPR, epinephrine, and search for H’s & T’s", "Nitroglycerin drip", "Atropine only"], correctIndex: 2, explanation: "PEA is non-shockable—CPR + epi and treat reversible causes." },
  { id: 1068, level: "Paramedic", category: "ECG/Resuscitation", text: "Asystole management includes:", options: ["Defibrillation", "Synchronized cardioversion", "CPR, epinephrine, and reversible causes", "Adenosine", "Magnesium only"], correctIndex: 2, explanation: "Asystole is non-shockable—CPR + epi and treat causes." },
  { id: 1069, level: "Paramedic", category: "ECG/Resuscitation", text: "VF/pulseless VT management begins with:", options: ["Atropine", "Adenosine", "Defibrillation and CPR", "Synchronized cardioversion", "Nitroglycerin"], correctIndex: 2, explanation: "Shockable rhythms: defibrillate and continue high-quality CPR." },
  { id: 1070, level: "Paramedic", category: "ECG/Resuscitation", text: "A patient has STEMI on 12-lead. Prehospital priority is:", options: ["Wait for troponin", "Observe for 30 minutes", "Rapid transport to PCI-capable center with activation/pre-notification", "Give adenosine", "Give furosemide always"], correctIndex: 2, explanation: "STEMI is time-critical—activate cath lab and transport rapidly." },
  { id: 1071, level: "Paramedic", category: "ECG/Resuscitation", text: "Inferior STEMI with hypotension and clear lungs suggests possible:", options: ["Left main occlusion always", "Asthma", "Right ventricular infarct", "Pneumonia", "PEA arrest"], correctIndex: 2, explanation: "RV infarct can cause hypotension with clear lungs due to preload dependence." },
  { id: 1072, level: "Paramedic", category: "ECG/Resuscitation", text: "A pacer spike with no subsequent QRS complex indicates:", options: ["Normal capture", "VF", "Failure to capture", "Sinus rhythm", "Asystole always"], correctIndex: 2, explanation: "Spikes without QRS means the myocardium is not depolarizing (no capture)." },
  { id: 1073, level: "Paramedic", category: "ECG/Resuscitation", text: "A patient with symptomatic bradycardia unresponsive to atropine should receive:", options: ["Adenosine", "Defibrillation", "Transcutaneous pacing and/or pressors per protocol", "Nitroglycerin", "Magnesium"], correctIndex: 2, explanation: "If atropine fails, TCP and pressor support are next steps." },
  { id: 1074, level: "Paramedic", category: "ECG/Resuscitation", text: "A regular narrow tachycardia converts after adenosine. Most likely rhythm was:", options: ["Atrial fibrillation", "Ventricular fibrillation", "SVT (AVNRT/AVRT)", "Asystole", "Sinus bradycardia"], correctIndex: 2, explanation: "Adenosine typically terminates AV node–dependent SVT." },
  { id: 1075, level: "Paramedic", category: "ECG/Resuscitation", text: "An irregular wide-complex tachycardia in an unstable patient should be treated with:", options: ["Adenosine", "Vagal maneuvers", "Defibrillation (treat as VF/polymorphic VT) if cannot synchronize", "Nitroglycerin", "Atropine"], correctIndex: 2, explanation: "Irregular wide tachy can be dangerous (e.g., pre-excited AF); if unstable, shock (often unsynchronized)." },
  { id: 1076, level: "Paramedic", category: "ECG/Resuscitation", text: "ETCO2 rises suddenly during CPR. This may indicate:", options: ["Worsening compressions", "Tube displacement", "ROSC", "Hypoglycemia", "Hyperventilation syndrome"], correctIndex: 2, explanation: "A sudden sustained ETCO2 increase can indicate return of spontaneous circulation." },
  { id: 1077, level: "Paramedic", category: "ECG/Resuscitation", text: "Persistently very low ETCO2 during CPR MOST suggests:", options: ["Excellent perfusion", "Hyperglycemia", "Poor perfusion/low-quality compressions or prolonged downtime", "Perfect tube placement", "Aspirin allergy"], correctIndex: 2, explanation: "Low ETCO2 often reflects poor blood flow; optimize compressions and address causes." },
  { id: 1078, level: "Paramedic", category: "ECG/Resuscitation", text: "A 12-lead shows peaked T waves and QRS widening. Most likely issue is:", options: ["Hypokalemia", "Hypercalcemia", "Hyperkalemia", "Hyponatremia", "Hypomagnesemia"], correctIndex: 2, explanation: "Peaked T waves and widening QRS are classic for hyperkalemia." },
  { id: 1079, level: "Paramedic", category: "ECG/Resuscitation", text: "A patient has SVT and is unstable (hypotensive, altered). Best therapy is:", options: ["Adenosine", "Diltiazem", "Synchronized cardioversion", "Observe", "Oral fluids"], correctIndex: 2, explanation: "Unstable tachycardia requires synchronized cardioversion." },
  { id: 1080, level: "Paramedic", category: "ECG/Resuscitation", text: "A patient has AF with RVR and is unstable. Best therapy is:", options: ["Adenosine", "Vagal maneuvers", "Synchronized cardioversion", "No treatment", "Aspirin only"], correctIndex: 2, explanation: "Unstable tachyarrhythmias (including AF with RVR) require synchronized cardioversion." },
  { id: 1081, level: "Paramedic", category: "ECG/Resuscitation", text: "A patient has torsades de pointes. The first-line medication is:", options: ["Calcium chloride", "Atropine", "Magnesium sulfate", "Aspirin", "Nitroglycerin"], correctIndex: 2, explanation: "Magnesium is the drug of choice for torsades." },
  { id: 1082, level: "Paramedic", category: "ECG/Resuscitation", text: "A bradycardic patient is hypotensive with altered mental status. This is treated as:", options: ["Normal athlete bradycardia", "Benign rhythm", "Symptomatic bradycardia per ACLS (atropine/TCP/pressors)", "SVT", "PEA"], correctIndex: 2, explanation: "Symptoms define instability—treat bradycardia per algorithm." },
  { id: 1083, level: "Paramedic", category: "ECG/Resuscitation", text: "If transcutaneous pacing is started, the goal is to achieve:", options: ["Just pacer spikes on monitor", "A faster artifact only", "Electrical capture with mechanical capture (pulse/improved perfusion)", "Lower oxygen saturation", "Pain only"], correctIndex: 2, explanation: "You need both electrical capture and improved perfusion/pulse (mechanical capture)." },
  { id: 1084, level: "Paramedic", category: "ECG/Resuscitation", text: "A patient has sinus tachycardia due to dehydration. Best management is:", options: ["Adenosine", "Cardioversion", "Treat cause (fluids, cooling, etc.)", "Defibrillation", "Atropine"], correctIndex: 2, explanation: "Sinus tachycardia is usually compensatory; treat the underlying cause." },
  { id: 1085, level: "Paramedic", category: "ECG/Resuscitation", text: "A patient is post-ROSC and hypotensive. The BEST general approach is:", options: ["Ignore BP if awake", "Give nitro for all chest pain", "Support perfusion (fluids/pressors per protocol) and treat cause while monitoring", "Hyperventilate aggressively", "Stop oxygen immediately"], correctIndex: 2, explanation: "Post-ROSC care focuses on airway/oxygenation, BP support, and treating causes." },
  { id: 1086, level: "Paramedic", category: "ECG/Resuscitation", text: "A wide-complex tachycardia is regular and monomorphic and the patient is stable. A possible initial consideration (protocol-dependent) is:", options: ["Defibrillation immediately", "Atropine", "Adenosine (in certain regular monomorphic wide tachycardias)", "Oral glucose", "Aspirin"], correctIndex: 2, explanation: "Adenosine may be used for stable regular monomorphic wide tachycardia in select cases per protocol; avoid if irregular." },
  { id: 1087, level: "Paramedic", category: "ECG/Resuscitation", text: "A patient with chest pain has ST depression in multiple leads with elevation in aVR. This can suggest:", options: ["Benign early repolarization", "Pericarditis", "Left main/proximal LAD or multi-vessel ischemia (high-risk)", "Normal ECG", "Right bundle branch block only"], correctIndex: 2, explanation: "Diffuse ST depression with aVR elevation can indicate high-risk ischemia—treat as critical ACS." },
  { id: 1088, level: "Paramedic", category: "ECG/Resuscitation", text: "For VF/pVT, after defibrillation you should:", options: ["Stop and check pulse for 30 seconds", "Wait for rhythm to stabilize", "Resume CPR immediately with minimal interruption", "Remove pads", "Give oral fluids"], correctIndex: 2, explanation: "Minimize pauses; resume compressions immediately after shock." },
  { id: 1089, level: "Paramedic", category: "ECG/Resuscitation", text: "An ET tube is placed and waveform capnography shows a consistent waveform. This indicates:", options: ["Esophageal placement", "No ventilation", "Tracheal placement is strongly supported (confirm with clinical signs too)", "Only hypoglycemia", "Only bronchospasm"], correctIndex: 2, explanation: "Continuous waveform capnography is the best field confirmation for tracheal placement." },
  { id: 1090, level: "Paramedic", category: "ECG/Resuscitation", text: "A patient has bradycardia due to hypoxia. The MOST important treatment is:", options: ["Atropine only", "Pacing only", "Correct hypoxia with oxygen/ventilation support", "Aspirin", "Nitroglycerin"], correctIndex: 2, explanation: "Hypoxia-driven bradycardia improves with oxygenation/ventilation—treat the cause." },
  { id: 1091, level: "Paramedic", category: "ECG/Resuscitation", text: "In suspected hyperkalemia with ECG changes, the FIRST stabilizing medication often is:", options: ["Aspirin", "Nitroglycerin", "Calcium (per protocol)", "Adenosine", "Furosemide"], correctIndex: 2, explanation: "Calcium stabilizes the myocardium quickly in severe hyperkalemia." },
  { id: 1092, level: "Paramedic", category: "ECG/Resuscitation", text: "A patient has chest pain and inferior STEMI; they become hypotensive after nitrates. This suggests:", options: ["Anxiety", "Pneumonia", "Right ventricular involvement/preload dependence", "GERD", "Hyperventilation"], correctIndex: 2, explanation: "Inferior MI may involve RV; nitrates can reduce preload and cause hypotension." },
  { id: 1093, level: "Paramedic", category: "ECG/Resuscitation", text: "A patient is in PEA. The rhythm is organized but no pulse. The correct action is:", options: ["Defibrillate", "Cardiovert", "CPR and epinephrine; treat reversible causes", "Adenosine", "Nitro"], correctIndex: 2, explanation: "PEA is non-shockable—CPR + epi + H’s & T’s." },

  // 3) Medical Critical Care (Paramedic) — 1094–1123
  { id: 1094, level: "Paramedic", category: "Medical Critical Care", text: "A patient has hypotension, fever, and altered mental status with warm skin early. This is most consistent with:", options: ["Cardiogenic shock", "Hypovolemic shock", "Septic shock (distributive) early phase", "Obstructive shock only", "Anaphylaxis only"], correctIndex: 2, explanation: "Sepsis can cause early warm shock due to vasodilation with hypotension and AMS." },
  { id: 1095, level: "Paramedic", category: "Medical Critical Care", text: "A patient with DKA has metabolic acidosis. The expected respiratory compensation is:", options: ["Bradypnea", "Apnea", "Kussmaul respirations (deep/rapid)", "Cheyne-Stokes", "No change"], correctIndex: 2, explanation: "Metabolic acidosis triggers hyperventilation to lower CO2." },
  { id: 1096, level: "Paramedic", category: "Medical Critical Care", text: "A patient is suspected of TCA overdose and has widened QRS. A key treatment (protocol-dependent) is:", options: ["Naloxone", "Magnesium", "Sodium bicarbonate", "Adenosine", "Diltiazem"], correctIndex: 2, explanation: "Bicarbonate can narrow QRS and treat sodium-channel blockade in TCA toxicity." },
  { id: 1097, level: "Paramedic", category: "Medical Critical Care", text: "A patient has severe hyperkalemia with ECG changes. After calcium, additional therapies aim to:", options: ["Increase potassium", "Stop ventilation", "Shift potassium intracellularly and remove it from the body (protocol-dependent)", "Increase clotting", "Cause bronchoconstriction"], correctIndex: 2, explanation: "After membrane stabilization, treatments shift K+ into cells and enhance elimination." },
  { id: 1098, level: "Paramedic", category: "Medical Critical Care", text: "A patient has suspected opioid overdose. The endpoint of naloxone titration should be:", options: ["Full alertness and agitation", "Complete pain relief", "Adequate spontaneous ventilation", "HR >140", "SpO2 100% always"], correctIndex: 2, explanation: "Goal is adequate breathing, not complete arousal; avoid precipitating severe withdrawal." },
  { id: 1099, level: "Paramedic", category: "Medical Critical Care", text: "A patient has severe asthma and now a “silent chest” with exhaustion. Best next step is:", options: ["Reduce oxygen", "Delay interventions", "Prepare for assisted ventilation/advanced airway and aggressive bronchodilator therapy per protocol", "Give aspirin", "Give diuretics"], correctIndex: 2, explanation: "Silent chest with fatigue is impending failure—ventilatory support may be required." },
  { id: 1100, level: "Paramedic", category: "Medical Critical Care", text: "A patient has suspected pulmonary embolism and becomes hypotensive. This is concerning for:", options: ["Small PE only", "Stable condition", "Massive PE causing obstructive shock", "Asthma attack only", "GI bleed"], correctIndex: 2, explanation: "Hypotension with PE symptoms suggests massive PE and obstructive shock." },
  { id: 1101, level: "Paramedic", category: "Medical Critical Care", text: "A patient has hypotension with JVD and muffled heart tones after trauma. This suggests:", options: ["Tension pneumothorax only", "Septic shock", "Cardiac tamponade", "Hypoglycemia", "COPD"], correctIndex: 2, explanation: "Beck’s triad suggests tamponade (obstructive shock)." },
  { id: 1102, level: "Paramedic", category: "Medical Critical Care", text: "A patient has hypertensive emergency with severe headache and neuro deficits. Priority is:", options: ["Ignore BP", "Give nitro indiscriminately", "Support ABCs, rapid transport, and avoid excessive BP drops in the field per protocol", "Give oral glucose", "Delay transport for observation"], correctIndex: 2, explanation: "Hypertensive emergencies require controlled management and rapid definitive care; avoid precipitous drops." },
  { id: 1103, level: "Paramedic", category: "Medical Critical Care", text: "A patient has suspected CO poisoning. Pulse oximetry may read normal because:", options: ["CO increases oxygen", "Oximetry reads COHb as oxyhemoglobin", "CO lowers SpO2 always", "It measures blood pressure", "It detects cyanide"], correctIndex: 1, explanation: "Standard SpO2 cannot distinguish carboxyhemoglobin; treat with high-flow oxygen and remove from exposure." },
  { id: 1104, level: "Paramedic", category: "Medical Critical Care", text: "A patient has cholinergic toxidrome (SLUDGE) with bronchorrhea and bradycardia. Antidote classically includes:", options: ["Naloxone", "Epinephrine only", "Atropine (and pralidoxime in organophosphate exposure) per protocol", "Adenosine", "Diltiazem"], correctIndex: 2, explanation: "Organophosphate poisoning is treated with atropine and pralidoxime (2-PAM) per protocol." },
  { id: 1105, level: "Paramedic", category: "Medical Critical Care", text: "An anticholinergic toxidrome is suggested by:", options: ["Wet skin and salivation", "Miosis and bradycardia", "Hot dry skin, mydriasis, tachycardia, delirium", "Bronchorrhea", "Severe diarrhea"], correctIndex: 2, explanation: "Anticholinergic: 'hot as a hare, dry as a bone, blind as a bat, mad as a hatter'." },
  { id: 1106, level: "Paramedic", category: "Medical Critical Care", text: "A patient has suspected cyanide poisoning from smoke inhalation. Key concern is:", options: ["Only bronchospasm", "Delayed bleeding", "Severe tissue hypoxia despite oxygen", "Hyperglycemia", "DVT"], correctIndex: 2, explanation: "Cyanide disrupts cellular oxygen use; rapid deterioration can occur." },
  { id: 1107, level: "Paramedic", category: "Medical Critical Care", text: "A patient has severe sepsis with hypotension refractory to fluids. Next step is typically:", options: ["Diuretics", "Beta blocker", "Vasopressors and rapid transport per protocol", "Nitroglycerin", "Adenosine"], correctIndex: 2, explanation: "Distributive shock may require vasopressors after adequate fluid resuscitation." },
  { id: 1108, level: "Paramedic", category: "Medical Critical Care", text: "A patient has suspected aortic dissection. A key prehospital principle is:", options: ["Give aspirin and heparin routinely", "Treat as simple anxiety", "Avoid interventions that worsen hypotension; rapid transport and careful assessment", "Give nitro regardless of BP", "Delay transport for repeat ECGs"], correctIndex: 2, explanation: "Dissection is time-critical; avoid routine anticoagulation and manage carefully per protocol." },
  { id: 1109, level: "Paramedic", category: "Medical Critical Care", text: "A patient has acute pulmonary edema and is hypertensive. Best first-line supportive intervention is:", options: ["Large fluid bolus", "Trendelenburg", "CPAP and vasodilator strategy per protocol when BP allows", "Adenosine", "Atropine"], correctIndex: 2, explanation: "CPAP improves oxygenation and reduces preload/afterload; nitrates may help if not hypotensive." },
  { id: 1110, level: "Paramedic", category: "Medical Critical Care", text: "A patient has status epilepticus. First-line medication class is:", options: ["Beta blockers", "Calcium channel blockers", "Benzodiazepines", "Antiplatelets", "Diuretics"], correctIndex: 2, explanation: "Benzodiazepines are first-line for ongoing seizures." },
  { id: 1111, level: "Paramedic", category: "Medical Critical Care", text: "A patient has severe hypoglycemia and is seizing. Best immediate therapy is:", options: ["Aspirin", "Nitroglycerin", "Glucose replacement (IV dextrose or glucagon per protocol) and airway protection", "Furosemide", "Adenosine"], correctIndex: 2, explanation: "Treat hypoglycemia urgently and protect airway during seizure." },
  { id: 1112, level: "Paramedic", category: "Medical Critical Care", text: "In traumatic brain injury, best ventilation goal after airway control is:", options: ["Hyperventilate everyone to ETCO2 20", "Allow hypercapnia", "Maintain normocapnia and adequate oxygenation; hyperventilate only for herniation signs per protocol", "Stop ventilations", "Only oxygen with no monitoring"], correctIndex: 2, explanation: "Avoid hypo/hyperventilation; reserve hyperventilation for impending herniation." },
  { id: 1113, level: "Paramedic", category: "Medical Critical Care", text: "A patient has suspected opioid overdose but is ventilating adequately and is stable. Naloxone use should:", options: ["Be mandatory always", "Be given as massive dose immediately", "Be considered based on protocol and goals; prioritize monitoring and ventilation readiness", "Be given orally", "Replace oxygen therapy"], correctIndex: 2, explanation: "If breathing is adequate, naloxone may not be necessary; airway monitoring remains key." },
  { id: 1114, level: "Paramedic", category: "Medical Critical Care", text: "A patient has severe metabolic acidosis. The primary correction is usually:", options: ["Immediate bicarbonate for all cases", "No treatment", "Treat the underlying cause (e.g., sepsis/DKA) and support perfusion/ventilation", "Aspirin", "Atropine"], correctIndex: 2, explanation: "Address the cause; bicarbonate is case-specific and protocol-dependent." },
  { id: 1115, level: "Paramedic", category: "Medical Critical Care", text: "A patient with renal failure has fluid overload signs and hypertension. A key risk during ventilation is:", options: ["Low airway pressure", "Bradycardia from oxygen", "Worsening pulmonary edema if ventilation/oxygenation not supported appropriately", "Curing CHF instantly", "Dehydration from oxygen"], correctIndex: 2, explanation: "Fluid overload can worsen oxygenation; support ventilation and consider CPAP/ALS care per protocol." },
  { id: 1116, level: "Paramedic", category: "Medical Critical Care", text: "A patient has severe agitation, diaphoresis, hyperthermia, and tachycardia after stimulant use. Priority includes:", options: ["Long physical struggle", "Give aspirin", "Rapid sedation per protocol, cooling, and monitoring for rhabdomyolysis/hyperthermia", "Give nitro", "Oral glucose only"], correctIndex: 2, explanation: "Sympathomimetic toxicity can be fatal; control agitation, cool, and monitor." },
  { id: 1117, level: "Paramedic", category: "Medical Critical Care", text: "A patient has suspected PE and is in cardiac arrest. A key reversible cause category is:", options: ["Diabetes", "Stroke", "Thrombosis (H’s & T’s)", "Hypothermia only", "Tension headache"], correctIndex: 2, explanation: "PE falls under 'Thrombosis' in H’s & T’s." },
  { id: 1118, level: "Paramedic", category: "Medical Critical Care", text: "A patient with severe asthma is ventilated. To reduce air trapping, you should:", options: ["Increase rate to 30/min", "Use very large tidal volumes", "Lower rate and allow longer exhalation time", "Stop bronchodilators", "Add fluid to lungs"], correctIndex: 2, explanation: "Asthma requires prolonged exhalation; high rates cause air trapping and hypotension." },
  { id: 1119, level: "Paramedic", category: "Medical Critical Care", text: "A patient with hypothermia is in cardiac arrest. A key care principle is:", options: ["Declare death quickly", "Warm rapidly by rubbing extremities", "Continue resuscitation per protocol and prevent further heat loss; handle gently", "Defibrillate indefinitely without CPR", "Give oral fluids"], correctIndex: 2, explanation: "Hypothermia can mimic death; follow protocols and handle gently to avoid dysrhythmias." },
  { id: 1120, level: "Paramedic", category: "Medical Critical Care", text: "A patient has severe GI bleed with hypotension. Best initial approach is:", options: ["Diuretics", "Nitroglycerin", "Support ABCs, control perfusion with fluids/blood strategies per protocol, rapid transport", "Adenosine", "Atropine"], correctIndex: 2, explanation: "Hemorrhagic shock requires perfusion support and rapid definitive care." },
  { id: 1121, level: "Paramedic", category: "Medical Critical Care", text: "A patient has airway edema from anaphylaxis. If ventilation becomes impossible, the next step (provider-dependent) is:", options: ["Wait for hospital", "Give oral glucose", "Prepare for advanced airway/surgical airway per protocol", "Give furosemide", "Give aspirin"], correctIndex: 2, explanation: "Severe airway edema can require advanced airway or surgical airway per protocol." },
  { id: 1122, level: "Paramedic", category: "Medical Critical Care", text: "A patient with sepsis has rising lactate and persistent hypotension. This indicates:", options: ["Recovery", "Only anxiety", "Ongoing poor perfusion and high risk—needs aggressive resuscitation and rapid definitive care", "Asthma", "Stable dehydration"], correctIndex: 2, explanation: "Persistent hypotension and elevated lactate indicate ongoing shock and high mortality risk." },
  { id: 1123, level: "Paramedic", category: "Medical Critical Care", text: "A patient has severe hyperkalemia (renal failure) and develops a sine-wave ECG. This is:", options: ["Benign finding", "A sign of hypokalemia", "A pre-arrest rhythm requiring immediate treatment per protocol", "Normal variant", "Only anxiety"], correctIndex: 2, explanation: "Sine-wave in hyperkalemia is life-threatening—treat immediately per protocol (calcium, shifting therapies, etc.)." }
];
