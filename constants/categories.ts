export const EXPENSE_CATEGORIES = [
  { id: "food", label: "Comida", icon: "🍽️" },
  { id: "transport", label: "Transporte", icon: "🚗" },
  { id: "shopping", label: "Compras", icon: "🛍️" },
  { id: "entertainment", label: "Entretenimiento", icon: "🎬" },
  { id: "utilities", label: "Servicios", icon: "💡" },
  { id: "health", label: "Salud", icon: "⚕️" },
  { id: "education", label: "Educación", icon: "📚" },
  { id: "other", label: "Otros", icon: "📦" },
];

export const getCategoryLabel = (categoryId: string): string => {
  const category = EXPENSE_CATEGORIES.find((cat) => cat.id === categoryId);
  return category?.label || "Sin categoría";
};

export const getCategoryIcon = (categoryId: string): string => {
  const category = EXPENSE_CATEGORIES.find((cat) => cat.id === categoryId);
  return category?.icon || "📦";
};
