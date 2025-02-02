const tips = {
    smoking: [
        "Drink water when you feel cravings.",
        "Chew sugar-free gum to keep your mouth busy.",
        "Avoid triggers like coffee or alcohol.",
        "Practice deep breathing exercises.",
        "Remind yourself why you want to quit."
    ],
    alcohol: [
        "Avoid situations where alcohol is present.",
        "Find a hobby to keep yourself occupied.",
        "Surround yourself with supportive people.",
        "Practice mindfulness and meditation.",
        "Set small, achievable goals for yourself."
    ],
    gambling: [
        "Block gambling websites on your devices.",
        "Find alternative ways to cope with stress.",
        "Set a strict budget for entertainment.",
        "Talk to a trusted friend or counselor.",
        "Focus on long-term financial goals."
    ]
};

function getRandomTip(addictionType) {
    const tipList = tips[addictionType] || [];
    return tipList.length > 0 ? tipList[Math.floor(Math.random() * tipList.length)] : "No tips available today.";
}