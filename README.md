# To do list
- [ ] Have functions in props like renderGroupItem that receives parameters like groupId, that allows override render;
- [ ] Receive props like intervalType (day, week, month) that is used to decide what to show;
- [ ] Receive color code when rendering the "event" box but also make available a function to override the render, so it can be customized, example: holiday event;
- [ ] Have props so the user can define the periods to show, maybe the end can be optional and if is not set then is the actual date or something like that;
---

# Reminders:
- Try to keep everything easy to customize;
- This is going to be used initially for Void HR, but we need to keep this library independent, so it can be used later if needed;
- When the events content gets too big it should have a vertical scroll, but the sidebar should stay fixed
- Is not using a date library, only the javascript Date
---

# How to use:
## Mandatory props
``` typescript
groups: Array<Group>;
```


## Option props available
``` typescript
groupsClass?: string;
renderGroupItem?(group: Group): React.ReactNode;
```
   - **groupsClass** - class to be added to group item css class, so it can be customized;
   - **renderGroupItem** - function to override group item render;

