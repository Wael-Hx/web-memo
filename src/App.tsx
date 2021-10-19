import React, { useCallback, useEffect, useMemo } from "react";
import { Box, Grid, useDisclosure } from "@chakra-ui/react";
import EmptyCollection from "./components/main/EmptyCollection";
import Tab from "./components/tab/Tab";
import Note from "./components/note/Note";
import NotesContainer from "./components/note/NotesContainer";
import NoteSection from "./components/note/NoteSection";
import Separator from "./components/note/NoteSeparator";
import TabContainer from "./components/tab/TabContainer";
import useNoteStore from "./store/noteStore";
import Settings from "./components/main/Settings";
import Modal from "../ui/drawer/Modal";
import EditCollectionForm from "../ui/shared/EditCollectionForm";
import { CollectionOptions } from "./store/types";

const App = () => {
  const [collections, activeTab, addNewNote, layout, updateCollection] = useNoteStore(
    useCallback(
      (state) => [
        state.collections,
        state.activeTab,
        state.addNewNote,
        state.tabLayout,
        state.updateCollection,
      ],
      []
    )
  );

  useEffect(() => {
    browser.runtime.onMessage.addListener(
      (request: { msg: string; collectionProps: CollectionOptions }) => {
        if (request.msg === "NEW_NOTE") {
          addNewNote(request.collectionProps);
        }
      }
    );
  }, [addNewNote]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const pinnedNote = useMemo(() => {
    return collections[activeTab].notes.filter((note) => note.isPinned);
  }, [activeTab, collections]);

  const otherNotes = useMemo(() => {
    return collections[activeTab].notes.filter((note) => !note.isPinned);
  }, [activeTab, collections]);

  return (
    <Box as="main" w="100vw" h="100vh">
      <Grid
        h="full"
        templateRows="1fr"
        templateColumns={`repeat(${layout === "default" ? "10" : "14"} , 1fr)`}
        gap={3}
        overflow="auto"
      >
        <TabContainer colSpan={layout === "default" ? 2 : 1}>
          {Object.keys(collections).map((url) => (
            <Tab
              key={url}
              displayName={collections[url].displayName}
              customIconType={collections[url].customIconType}
              note={collections[url].notes[0]}
              favicon={collections[url].notes.find((n) => n.favicon)?.favicon}
            />
          ))}
        </TabContainer>
        <NotesContainer colSpan={layout === "default" ? 8 : 13}>
          <EmptyCollection collections={collections} activeTab={activeTab} />
          {pinnedNote.length > 0 && (
            <>
              <Separator as="h3" colSpan={1}>
                Pinned
              </Separator>
              <NoteSection>
                {pinnedNote.map((note) => (
                  <Note key={note.id} note={note} />
                ))}
              </NoteSection>
              <Separator as="h3" colSpan={1}>
                Other
              </Separator>
            </>
          )}
          <NoteSection>
            {otherNotes.map((note) => (
              <Note key={note.id} note={note} />
            ))}
          </NoteSection>
        </NotesContainer>
      </Grid>
      <Settings openModal={onOpen} />
      <Modal
        size="md"
        modalTitle={collections[activeTab].notes[0].website}
        onClose={onClose}
        isOpen={isOpen}
        returnFocusOnClose={false}
      >
        <EditCollectionForm
          editCollection={updateCollection}
          url={collections[activeTab].notes[0].website}
          dispalyName={collections[activeTab].displayName}
          iconType={collections[activeTab].customIconType}
          favicon={collections[activeTab].notes[0].favicon}
        />
      </Modal>
    </Box>
  );
};

export default App;
