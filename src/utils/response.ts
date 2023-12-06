import { EntryEvent } from "../common/model";

/** Relocate events array after have an update on specific event
 * @param updatedEvent - Updated event
 * @param events - Event array
 * @returns - Relocated event array
 */
export const standardizationUpdateData = (
  updatedEvent: EntryEvent,
  events: EntryEvent[]
) => {
  const standardizationData = events.map((item: EntryEvent) => {
    if (item.id === updatedEvent.id) {
      item = { ...item, ...updatedEvent };
    }
    return item;
  });

  return standardizationData;
};
