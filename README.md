# How to use:
## Mandatory props
``` typescript
groups: Array<Group>;
intervalType: 'day' | 'week' | 'month';
startPeriod: Date;
events: Array<EventItem>;
```


## Option props available
``` typescript
groupsClass: string;
renderGroupItem(group: Group): React.ReactNode;
endPeriod: Date;
```
   - **groupsClass** - class to be added to group item css class, so it can be customized;
   - **renderGroupItem** - function to override group item render;
   - **endPeriod** - if not given the end will be the current date;


---
# Reminders:
- Try to keep everything easy to customize;
- This is going to be used initially for Void HR, but we need to keep this library independent, so it can be used later if needed;
- Is not using a date library, only the javascript Date
