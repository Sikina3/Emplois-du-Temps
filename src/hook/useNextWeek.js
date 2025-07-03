import { useMemo, useEffect, useState } from "react";
import { useTimetable } from "../services/useTimetable";

export const useNextWeek = () => {
  const { getAll, create } = useTimetable();
  const { data: timetables, isFetching } = getAll();
  const [timetableId, setTimetableId] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  const nextMonday = useMemo(() => {
    const today = new Date();
    const delta = (8 - today.getDay()) % 7 || 7;
    const monday = new Date();
    monday.setDate(today.getDate() + delta);
    return monday.toISOString().split("T")[0];
  }, []);

  useEffect(() => {
    if (isFetching || !timetables || isCreating) return;

    const found = timetables.find((t) => t.weekOf === nextMonday);

    if (found) {
      setTimetableId(found.id);
    } else {
      setIsCreating(true);
      create.mutate(
        { weekOf: nextMonday },
        {
          onSuccess: (res) => {
            setTimetableId(res?.Timetable?.id);
            setIsCreating(false);
          },
        }
      );
    }
  }, [isFetching, timetables, nextMonday, create, isCreating]);

  return { timetableId, nextMonday };
};
